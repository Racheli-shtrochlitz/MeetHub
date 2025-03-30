const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const teacherRoutes = require('./Routes/teacher.js');
const studentRoutes = require('./Routes/student.js');
const materialRoutes = require('./Routes/material.js');
const lessonRoutes = require('./Routes/lesson.js');


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

app.use('/teacher',teacherRoutes);
app.use('/student',studentRoutes);
app.use('/material',materialRoutes);
app.use('/lesson',lessonRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});