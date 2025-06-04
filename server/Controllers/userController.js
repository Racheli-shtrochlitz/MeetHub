const User = require('../Models/user');
const Lesson = require('../Models/lesson');
const Teacher = require('../Models/teacher');
const Student = require('../Models/student');
const mailController = require('../Controllers/mailController');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createTeacher } = require('./teacherController');
const { createStudent } = require('./studentController');

const SendVerificationEmail = async (req, res, next) => {
    const { email } = req.body;
    req.body.toName = req.body.toName || 'User';
    req.body.formName = req.body.formName || 'MeetHub';
    req.body.message = req.body.message || `Please verify your email address.\n\nThank you for registering with MeetHub!\n This is your verification code:\n <h1>${randCode}</h1>`;
    User.findOneAndUpdate({ email }, { verificationEmailCode: randCode });
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const randCode = Math.floor(10000 + Math.random() * 90000);
        mailController.sendVerificationEmail(email, randCode);
    } catch (error) {
        console.error('Error sending verification email:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const verifyEmail = async (req, res) => {
    if (!req.body.email || !req.body.code) {
        return res.status(400).json({ message: 'Email and code are required' });
    }
    const { email, code } = req.body;
    try {
        const user = await User.find({ email });
        if (!user ) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (user.verificationEmailCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

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

        return res.status(200).json({ data: token, message: 'Logged in successfully' });
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

        return res.status(200).json({ data: token, message: 'User registered successfully' });
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

        return res.status(200).json({ data: updatedUser, message: "User updated successfully" });
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

    console.log("activeRole: ", activeRole)

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

        console.log(lessons)
        return res.status(200).json({ data: lessons, message: 'Lessons fetched successfully' });
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
        return res.status(200).json({ data: user, message: 'User fetched successfully' });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const changeActiveRole = async (req, res) => {
    try {
        const userId = req.user.id;
        const { activeRole } = req.body;
        console.log("====================", activeRole)

        if (!activeRole || !['teacher', 'student'].includes(activeRole)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.activeRole === activeRole)
            return res.status(403).json({ message: `You are already ${activeRole}` })

        if (user.roles.length <= 1)
            return res.status(403).json({ message: `You are not a ${activeRole}` })

        user.activeRole = activeRole;
        await user.save();

        const token = jwt.sign({ id: userId, activeRole }, process.env.SECRET_TOKEN, { expiresIn: '10h' });

        res.status(200).json({ message: 'Role updated successfully', data: token });
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
    changeActiveRole,
    verifyEmail,
    SendVerificationEmail
};
