const User = require('../Models/user');
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
            return res.status(400).json({ message: "User not found" })
        }
        //to verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        if (!user.roles.includes(activeRole))
            return res.status(403).json({ error: `User is not assigned to role: ${activeRole}` })

        const token = jwt.sign({ id: user._id, roles: user.roles, activeRole: activeRole }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const signUp = async (req, res) => {
    const { name, email, password, activeRole } = req.body;

    if (!name||!email || !password || !activeRole)
        return res.status(400).json({ error: 'Missing fields' });

    if(!['teacher','student'].includes(activeRole))
        return res.status(400).json({error:"Invalid role"});

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
            roles: [activeRole]
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, roles: newUser.roles, activeRole: activeRole }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        // הוספת ה-ID של המשתמש החדש לגוף הבקשה
        req.userId = newUser._id;

        // טיפול ביצירת ישות מתאימה לפי התפקיד
        if (activeRole === 'teacher') {
            await createTeacher(req, res);
        } else if (activeRole === 'student') {
            await createStudent(req, res);
        } 

        return res.status(201).json({ token });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

// const getUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             res.send("User not found").status(404);
//         }
//         else
//             res.status(200).send(User);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Internal server error");
//     }
// };

// const addUser = async (req, res) => {
//     const { user } = req.body;
//     try {
//         const newUser = (await User.create(user));
//         if (!newUser) {
//             res.send("Probably you didnt sent correctly data...").status(404);
//         }
//         else
//             res.status(201).send(newUser);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Internal server error");
//     }
// };

// const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { user } = req.body;
//     try {
//         const newUser = await User.findByIdAndUpdate({ _id: id }, { user });
//         if (!newUser)
//             res.send("User not found").status(404);
//         else
//             res.status(200).send(newUser);
//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send("Internal server error");
//     }
// }

// const deleteUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findByIdAndDelete(id);
//         if (!user)
//             res.send("User not found").status(404);
//         else
//             res.status(200).send(User + "deleted successfully!!!");
//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send("Internal server error");
//     }
// }



module.exports = {
    signIn,
    signUp
};