const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {createTeacher}=require('./teacherController');
const {createStudent}=require('./studentController');



const signIn=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        //to verify the password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id,role:user.role},process.env.SECRET_TOKEN,{ expiresIn: '1h' });
        return res.status(200).json({token});
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const signUp=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        //create a new user
        const newUser=new User({
            name,
            email,
            password:await bcrypt.hash(password,10),//hashing the password
            role
        });
        await newUser.save();
        const token=jwt.sign({id:newUser._id,role:newUser.role},process.env.SECRET_TOKEN,{ expiresIn: '1h' });

        // הוספת ה-ID של המשתמש החדש לגוף הבקשה
        req.userId = newUser._id;

        // טיפול ביצירת ישות מתאימה לפי התפקיד
        if (role === 'teacher') {
            return createTeacher( req, res);
        } else if (role === 'student') {
            return createStudent(req, res);
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error");
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