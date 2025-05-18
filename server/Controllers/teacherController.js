const Teacher = require('../Models/teacher');

const getAllStudents = async (req, res) => {
    const id = req.user.id;
    try {
        const teacher = await Teacher.findOne({ user: id })
            .populate({
                path: 'students',
                populate: { path: 'user', model: 'User' }
            });
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }
        else {
            console.log("teacher: ", teacher)
            students = teacher.students;
            return res.status(200).json(students);
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const getAllSubjects = async (req, res) => {
    const id = req.user.id;
    try {
        const teacher = await Teacher.findOne({ user: id })
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }
        else {
            subjects = teacher.subject
            return res.status(200).json(subjects);
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


const getTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findById(id)
            .populate('students')
            .populate('lessons')
            .populate('user');
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }
        else
            return res.status(200).json(teacher);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const createTeacher = async (req, res) => {
    const { subject, students, lessons } = req.body;
    try {
        //create a new teacher
        const newTeacher = await Teacher.create({ subject: subject, students: students, lessons: lessons, user: req.userId || req.user.id, });

        return newTeacher;
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { teacher } = req.body;
    try {
        const newTecher = await Teacher.findByIdAndUpdate({ _id: id }, { ...teacher }, { new: true })
            .populate('students')
            .populate('lessons')
            .populate('user');
        if (!newTecher)
            return res.status(404).send("Teacher not found");
        else
            return res.status(200).json(newTecher);
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
            return res.status(404).send("Teacher not found");
        else
            res.status(200).json({ teacher: teacher, message: "deleted successfully!!!" });
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
            return res.status(404).send("No teachers found");
        }
        else
            return res.status(200).json(teachers);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const addStudent = async (req, res) => {
    const { student } = req.body;
    const userId = req.user.id;

    try {
        const teacherId = await Teacher.find({ user: userId });
        const teacher = await Teacher.findById(teacherId);
        if (!teacher)
            return res.status(404).json({ error: "Teacher not found" });

        // מוסיפים את הסטודנט לרשימת הסטודנטים
        await Teacher.findByIdAndUpdate(
            teacherId,
            { $addToSet: { students: student } },
            { new: true }
        );

        const updated = await Teacher.findById(teacherId);
        console.log("updated teacher: ", updated)


        return res.status(200).json({ message: "Student added successfully!" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getTeacherByToken = async (req, res) => {
    try{
        const teacher=await Teacher.findOne({user:req.user.id});
        return res.status(200).json(teacher);
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "===Invalid token." });
    }
}



module.exports = {
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
    getAllStudents,
    getAllSubjects,
    addStudent,
    getTeacherByToken
};