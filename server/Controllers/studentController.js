const Student = require('../Models/student');

const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id)
            .populate('lessons');
        if (!student) {
            res.send("Student not found").status(404);
        }
        else
            res.status(200).send(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};

const addStudent = async (req, res) => {
    const { student } = req.body;
    try {
        const newStudent = await Student.create(student)
            .populate('lessons');
        if (!newStudent) {
            res.send("Probably you didn't send correct data...").status(404);
        }
        else
            res.status(201).send(newStudent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    try {
        const newStudent = await Student.findByIdAndUpdate({ _id: id }, { student })
            .populate('lessons');
        if (!newStudent)
            res.send("Student not found").status(404);
        else
            res.status(200).send(newStudent);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id)
            .populate('lessons');
        if (!student)
            res.send("Student not found").status(404);
        else
            res.status(200).send(student + "deleted successfully!!!");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({})
            .populate('lessons');
        if (!students||students.length==0) {
            res.send("No students found").status(404);
        }
        else
            res.status(200).json(students);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    getAllStudents
};