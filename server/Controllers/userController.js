const User = require('../Models/user');
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const userToken=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.find({email});
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    //to verify the password
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid password"})
    }
    const token=jwp.sign({id:user._id},procces.env.SECRET_TOKEN);
    res.status(200).json({token});
}

const signIn=async(req,res)=>{

}

const signUp=async(req,res)=>{
    
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
    getUser,
    addUser,
    updateUser,
    deleteUser
};