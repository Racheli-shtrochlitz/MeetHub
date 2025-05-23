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
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const createTeacher = async (req, res) => {
    const { subject, students, lessons } = req.body;
    try {
        //create a new teacher
        const newTeacher = await Teacher.create({ subject: subject, students: students, lessons: lessons, user: req.userId||req.user.id,  });

       return newTeacher;
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
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
        return res.status(500).json({ message: "Internal server error", error: err.message });
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
        return res.status(500).json({ message: "Internal server error", error: err.message });
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
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = {
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers
};