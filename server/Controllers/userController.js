const User = require('../Models/user');
const Lesson = require('../Models/lesson');
const Teacher = require('../Models/teacher');
const Student = require('../Models/student');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createTeacher } = require('./teacherController');
const { createStudent } = require('./studentController');

const signIn = async (req, res) => {
    const { email, password, activeRole } = req.body;

    if (!email || !password || !activeRole)
        return res.status(400).json({ message: 'Missing fields' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.roles.includes(activeRole)) {
            return res.status(403).json({ message: `User is not assigned to role: ${activeRole}` });
        }

        const token = jwt.sign(
            { id: user._id, activeRole },
            process.env.SECRET_TOKEN,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ data:token, message: 'Logged in successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const signUp = async (req, res) => {
    const { name, email, password, activeRole } = req.body;
    if (!name || !email || !password || !activeRole)
        return res.status(400).json({ message: 'Missing fields' });

    if (!['teacher', 'student'].includes(activeRole))
        return res.status(400).json({ message: "Invalid role" });

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            roles: [activeRole],
            activeRole
        });

        req.userId = newUser._id;

        if (activeRole === 'teacher') {
            const teacher = await createTeacher(req, res);
            if (!teacher)
                return res.status(400).json({ message: "Can't create a teacher" });
        } else if (activeRole === 'student') {
            const student = await createStudent(req, res);
            if (!student)
                return res.status(400).json({ message: "Can't create a student" });
        }

        const savedUser = await newUser.save();
        const token = jwt.sign({ id: newUser._id, activeRole: activeRole }, process.env.SECRET_TOKEN, { expiresIn: '10h' });

        return res.status(200).json({ data:token, message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const id = req.user.id;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({data: updatedUser, message: "User updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addProfile = async (req, res) => {
    const { id } = req.user;
    const { newRole } = req.body;
    const user = await User.findById(id);

    if (!newRole)
        return res.status(400).json({ message: "Missing role" });

    if (!id)
        return res.status(400).json({ message: "Missing user ID" });

    if (user.roles.includes(newRole))
        return res.status(400).json({ message: `You are already a ${newRole}` });

    if (!['student', 'teacher'].includes(newRole))
        return res.status(400).json({ message: `Invalid role: ${newRole}` });

    try {
        if (newRole === 'teacher') {
            await Teacher.create({ students: [], lessons: [], user: id });
        } else {
            await Student.create({ user: id, lessons: [] });
        }

        await User.findByIdAndUpdate(id, { $push: { roles: newRole } });

        return res.status(200).json({ message: "New role added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllLessons = async (req, res) => {
    const id = req.user.id;
    const activeRole = req.user.activeRole;

    if (!id || !activeRole) {
        return res.status(400).json({ message: "Missing user or role" });
    }

    try {
        const object = await (activeRole === "teacher"
            ? Teacher.findOne({ user: id })
            : Student.findOne({ user: id }));

        if (!object) {
            return res.status(404).json({ message: `No ${activeRole} found with this user ID` });
        }

        const filter = activeRole === "teacher" ? { teacher: object._id } : { student: object._id };

        const lessons = await Lesson.find(filter)
            .populate({ path: 'student', populate: { path: 'user' } })
            .populate({ path: 'teacher', populate: { path: 'user' } });

        return res.status(200).json({ data:lessons, message: 'Lessons fetched successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getUserByToken = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await User.findById(decoded.id);
        return res.status(200).json({data: user, message: 'User fetched successfully' });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const changeActiveRole = async (req, res) => {
    try {
        const userId = req.user.id;
        const { activeRole } = req.body;

        if (!activeRole || !['teacher', 'student'].includes(activeRole)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.activeRole = activeRole;
        await user.save();

        const token = jwt.sign({ id: userId, activeRole }, process.env.SECRET_TOKEN, { expiresIn: '10h' });

        res.status(200).json({ message: 'Role updated successfully', data:token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    signIn,
    signUp,
    addProfile,
    getAllLessons,
    getUserByToken,
    updateUser,
    changeActiveRole
};
