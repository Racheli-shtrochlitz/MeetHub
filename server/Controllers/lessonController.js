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
    lesson.teacher = req.user.id; // Set the teacher to the logged-in user
    lesson.zoomLink =  "https://zoom.us/join"||"create meeting" ; //from zoom
    lesson.materials = [];//from drive
    lesson.feedback = "";
    try {
        const newLesson = await Lesson.create(lesson);

        //update the teacher and student
        const teacher = await Teacher.findById(lesson.teacher);
        const student = await Student.findById(lesson.student);

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
            return res.status(404).json("Probably you didn't send correct data...");
        }

        // const meetingResponse = await axios.post(`http://localhost:${process.env.PORT}/lesson/create-meeting`);

        return res.status(201).json({
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
            return res.status(404).send("Lesson not found");
        else
            return res.status(200).json({ lesson: lesson, message: "deleted successfully!!!" });
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
            return res.status(200).json(lessons);
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