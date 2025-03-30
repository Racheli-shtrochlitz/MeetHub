const Lesson = require('../Models/lesson');
const Student = require('../Models/student');
const Teacher = require('../Models/teacher');
const Material = require('../Models/material');

const getLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await Lesson.findById(id)
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!lesson) {
            res.send("Lesson not found").status(404);
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
        const newLesson = (await Lesson.create(lesson))
            .populate('teacher')
            .populate('student')
            .populate('materials');;
        if (!newLesson) {
            res.send("Probably you didnt sent correctly data...").status(404);
        }
        else
            res.status(201).send(newLesson);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
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
            res.send("Lesson not found").status(404);
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
            res.send("Lesson not found").status(404);
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
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    getAllLessons
};