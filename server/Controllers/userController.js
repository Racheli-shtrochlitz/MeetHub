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
        return res.status(400).json({ error: 'Missing fields' });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        //to verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        if (!user.roles.includes(activeRole))
            return res.status(403).json({ error: `User is not assigned to role: ${activeRole}` })

        const token = jwt.sign({ id: user._id, activeRole: activeRole }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error", error: err.message });
    }
}

const signUp = async (req, res) => {
    const { name, email, password, activeRole } = req.body;
    if (!name || !email || !password || !activeRole)
        return res.status(400).json({ error: 'Missing fields' });

    if (!['teacher', 'student'].includes(activeRole))
        return res.status(400).json({ error: "Invalid role" });

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        //create a new user
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),//hashing the password
            roles: [activeRole],
            activeRole
        });

        // הוספת ה-ID של המשתמש החדש לגוף הבקשה
        req.userId = newUser._id;

        //  טיפול ביצירת ישות מתאימה לפי התפקיד אם היתה תקלה ביצירת התפקיד, נעצור ולא נשמור את המשתמש
        if (activeRole === 'teacher') {
            const teacher = await createTeacher(req, res);
            if (!teacher)
                return res.status(400).json({ error: "can't create a teacher" });
        } else if (activeRole === 'student') {
            const student = await createStudent(req, res);
            if (!student)
                return res.status(400).json({ error: "can't create a student" });
        }

        //שמירת המשתמש רק לאחר וידוא יצירת התפקיד
        const savedUser = await newUser.save();
        console.log('Saved User:', savedUser);
        const token = jwt.sign({ id: newUser._id, activeRole: activeRole }, process.env.SECRET_TOKEN, { expiresIn: '10h' });

        return res.status(201).json({ token: token, newUser: newUser });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const id = req.user.id;

    if (!name || !email || !password) {
        return res.status(400).json({ err: "missing fields" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ err: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


const addProfile = async (req, res) => {

    const { id } = req.user;
    const { newRole } = req.body;
    const user = await User.findById(id);
    const roles = user.roles;

    if (!newRole)
        return res.status(400).json({ error: "you didn't provide a required parameter" });

    if (!id)
        return res.status(400).json({ error: "something went wrong... no id" });

    if (roles.includes(newRole))
        return res.status(500).json({ message: `you are already ${newRole}` });

    if (!['student', 'teacher'].includes(newRole))
        return res.status(500).json({ message: `invalid role: ${newRole}` });

    try {
        if (newRole === 'teacher') {
            await createTeacher(req, res);
            await User.findByIdAndUpdate(id, { $push: { roles: newRole } });//update the remote array
        }
        else {
            await createStudent(req, res);
            await User.findByIdAndUpdate(id, { $push: { roles: newRole } });//update the remote array
        }

        return res.status(200).json("new role added successfully!");

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllLessons = async (req, res) => {
    const id = req.user.id;
    const activeRole = req.user.activeRole;

    if (!id || !activeRole) {
        return res.status(400).json({ message: "Missing user or role" });
    }

    let object;

    // pop the teacher or student according to the role
    try {

        if (activeRole === "teacher") {
            object = await Teacher.findOne({ user: id });
        } else {
            object = await Student.findOne({ user: id });
        }

        if (!object) {
            return res.status(404).json({ message: `No ${activeRole} found with the given user ID` });
        }

        // create the filter for lessons
        const filter = activeRole === "teacher" ? { teacher: object._id } : { student: object._id };

        const lessons = await Lesson.find(filter)
        .populate({
            path: 'student',
            populate: { path: 'user' }
        })
        .populate({
            path: 'teacher',
            populate: { path: 'user' }
        });
        return res.status(200).json(lessons);


    }catch (err) {
        console.error(err); 
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
    
};

const getUserByToken = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const secret = process.env.SECRET_TOKEN;
        const decoded = jwt.verify(token, secret);
        const { id } = decoded;
        const user=await User.findById(id);
        return res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ err: err.message, message: "internak server error" });
    }
}

const changeActiveRole=async(req,res)=>{
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

        const token = jwt.sign({ id: userId, activeRole: activeRole }, process.env.SECRET_TOKEN, { expiresIn: '10h' });

    
        res.status(200).json({ message: 'Role updated successfully', token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}





module.exports = {
    signIn,
    signUp,
    addProfile,
    getAllLessons,
    getUserByToken,
    updateUser,
    changeActiveRole
};