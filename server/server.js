const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const teacherRoutes = require('./Routes/teacher.js');
const studentRoutes = require('./Routes/student.js');
const materialRoutes = require('./Routes/material.js');
const lessonRoutes = require('./Routes/lesson.js');
const userRoutes = require('./Routes/user.js');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json()); // Middleware to parse JSON
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log("Connected to MongoDB")})
.catch(err => {
    console.error("Error connecting to MongoDB:", err.message);
});

const authenticateUser=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).send("Access denied. No token provided.");
    }
    try{
        const decoded=jwt.verify(token,process.env.SECRET_TOKEN);//checking if the token is valid and validity
        if(!decoded){
            return res.status(401).send("Invalid token.");
        }
        req.user=decoded;//save the data of the user in the request object
        next();//continue to the next middleware or crud function
    }
    catch(err){
        return res.status(400).send("Invalid token.");
    }
}

app.use('/teacher',authenticateUser,teacherRoutes);
app.use('/student',authenticateUser,studentRoutes);
app.use('/material',authenticateUser,materialRoutes);
app.use('/lesson',authenticateUser,lessonRoutes);
app.use('/user',userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});