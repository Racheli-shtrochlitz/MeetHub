const Lesson = require('../Models/lesson');
const Teacher = require('../Models/teacher');
const Student = require('../Models/student');


const dotenv = require('dotenv');
dotenv.config();


const getLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await Lesson.findById(id)
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!lesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        else
            return res.status(200).json(lesson);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const addLesson = async (req, res) => {
    const { lesson } = req.body;
    console.log("lesson: ", lesson);
    if (!lesson.student) {
        return res.status(404).json({ message: "Student is required" });
    }
    if (!lesson.teacher) {
        return res.status(404).json({ message: "Teacher is required" });
    }
    const teacher = await Teacher.findById(lesson.teacher);
    const student = await Student.findById(lesson.student);
    console.log("lesson for creating: ", lesson);
    try {
        const newLesson = await Lesson.create(lesson);
        //update the teacher and student
        if (teacher && !teacher.lessons.includes(newLesson._id)) {
            teacher.lessons.push(newLesson._id);
            await teacher.save();
        }
        if (student && !student.lessons.includes(newLesson._id)) {
            student.lessons.push(newLesson._id);
            await student.save();
        }
        const populatedLesson = await Lesson.findById(newLesson._id)
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!populatedLesson) {
            return res.status(404).json({message:"Probably you didn't send correct data..."});
        }
        return res.status(200).json({message:'lesson added successfully', data: populatedLesson,});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


const updateLesson = async (req, res) => {
    const { id } = req.params;
    const { lesson } = req.body;
    try {
        const newLesson = await Lesson.findByIdAndUpdate({ _id: id }, { ...lesson }, { new: true })
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!newLesson)
            return res.status(404).json("Lesson not found");
        else
            return res.status(200).json(newLesson);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
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
            return res.status(404).json({message:"Lesson not found"});
        else
            return res.status(200).json({ data: lesson, message: "deleted successfully!!!" });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({})
            .populate('teacher')
            .populate('student')
            .populate('materials');
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found' });
        }
        else
            return res.status(200).json({data:lessons , message: "All lessons fetched successfully!"});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = {
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    getAllLessons
};