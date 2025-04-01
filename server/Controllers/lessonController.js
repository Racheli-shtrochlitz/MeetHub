const Lesson = require('../Models/lesson');
const axios = require("axios");
const dotenv=require('dotenv');
dotenv.config();
const {checkRole}=require('../Controllers/checkAccess')



const getLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await Lesson.findById(id)
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!lesson) {
            res.status(404).send("Lesson not found");
        }
        else
            res.status(200).send(lesson);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};

const addLesson = async (req, res) => {
    const { lesson } = req.body;
    try {
        const newLesson = await Lesson.create(lesson);
        
        const populatedLesson = await Lesson.findById(newLesson._id)
            .populate('teacher')
            .populate('student')
            .populate('materials');

        if (!populatedLesson) {
            return res.status(404).send("Probably you didn't send correct data...");
        }

       // const meetingResponse = await axios.post(`http://localhost:${process.env.PORT}/lesson/create-meeting`);

        res.status(201).json({
            lesson: populatedLesson,
            //meeting: meetingResponse.data
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


const updateLesson = async (req, res) => {
    const { id } = req.params;
    const { lesson } = req.body;
    try {
        const newLesson = await Lesson.findByIdAndUpdate({ _id: id }, { lesson })
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!newLesson)
            res.status(404).send("Lesson not found");
        else
            res.status(200).send(newLesson);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const deleteLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await Lesson.findByIdAndDelete(id)
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!lesson)
            res.status(404).send("Lesson not found");
        else
            res.status(200).send(lesson + "deleted successfully!!!");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const getAllLessons = async (req, res) => {
    try {
        console.log("Fetching Lessons...");
        const lessons = await Lesson.find({})
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!lessons || lessons.length === 0) {
            res.status(404).json({ message: 'No lessons found' });
        }
        else
            res.status(200).json(lessons);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    checkRole,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    getAllLessons
};