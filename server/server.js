const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const teacherRoutes = require('./Routes/teacher.js');
const studentRoutes = require('./Routes/student.js');
const materialRoutes = require('./Routes/material.js');
const lessonRoutes = require('./Routes/lesson.js');
const userRoutes = require('./Routes/user.js');
const zoomRoutes = require('./Routes/zoom.js');
const { sendMail } = require('./Controllers/mailController.js');
const { authenticateUser } = require('./Middlewares/checkAccess.js');
const jwt = require('jsonwebtoken');

const app = express();
// app.use(cors());
dotenv.config();
app.use(express.json()); // Middleware to parse JSON
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log("Connected to MongoDB") })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err.message);
    });

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/teacher', authenticateUser, teacherRoutes);
app.use('/student', authenticateUser, studentRoutes);
app.use('/material', authenticateUser, materialRoutes);
app.use('/lesson', authenticateUser, lessonRoutes);
app.use('/user', userRoutes);
app.use('/zoom', authenticateUser, zoomRoutes);
app.post('/message/sendMessage', authenticateUser, sendMail)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});