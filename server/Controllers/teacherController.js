const Teacher = require('../Models/teacher');

const getTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findById(id)
            .populate('students')
            .populate('lessons')
            .populate('user');
        if (!teacher) {
            res.send("Teacher not found").status(404);
        }
        else
            res.status(200).send(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};

const createTeacher = async (req, res) => {
    const { teacher } = req.body;
    teacher.user = req.body._id;
    try {
        const newTeacher = await Teacher.create(teacher);
        await newTeacher.populate('students').populate('lessons').populate('user');
        if (!newTeacher) {
            return res.status(404).json({ message: "Probably you didn't send correct data..." });
        }
        else
        return res.status(201).json(newTeacher);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { teacher } = req.body;
    try {
        const newTecher = await Teacher.findByIdAndUpdate({ _id: id }, { teacher })
            .populate('students')
            .populate('lessons')
            .populate('user');
        if (!newTecher)
            res.send("Teacher not found").status(404);
        else
            res.status(200).send(newTecher);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findByIdAndDelete(id)
            .populate('students')
            .populate('lessons')
            .populate('user');
        if (!teacher)
            res.send("Teacher not found").status(404);
        else
            res.status(200).send(teacher + "deleted successfully!!!");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({})
            .populate('students')
            .populate('lessons')
            .populate('user');
        if (!teachers || teachers.length === 0) {
            res.status(404).send("No teachers found");
        }
        else
            res.status(200).json(teachers);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers
};