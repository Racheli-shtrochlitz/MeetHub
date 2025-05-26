const Teacher = require('../Models/teacher');
const User = require('../Models/user');
const Student = require('../Models/student');


const getAllStudents = async (req, res) => {
    const id = req.user.id;
    try {
        const teacher = await Teacher.findOne({ user: id })
            .populate({
                path: 'students',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'name email image' 
                }
            });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        else {
            console.log("teacher: ", teacher)
            const students = teacher.students;
            return res.status(200).json({ data: students, message: "Students retrieved successfully!" });
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
            return res.status(404).json({ message: "Teacher not found" });
        }
        else
            return res.status(200).json({ data: teacher, message: "Teacher retrieved successfully!" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const createTeacher = async (req, res) => {
    const { students, lessons } = req.body;
    try {
        //create a new teacher
        const newTeacher = await Teacher.create({ students: students || [], lessons: lessons || [], user: req.userId || req.user.id, });
        return res.status(200).json({ data: newTeacher, message: "Teacher created successfully!" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { teacher } = req.body;
    try {
        const newTeacher = await Teacher.findByIdAndUpdate({ _id: id }, { ...teacher }, { new: true })
            .populate('students')
            .populate('lessons')
            .populate('user');
        if (!newTeacher)
            return res.status(404).json({ message: "Teacher not found" });
        else
            return res.status(200).json({ data: newTeacher });
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
            return res.status(404).json({ message: "Teacher not found" });
        else
            res.status(200).json({ data: teacher, message: "deleted successfully!!!" });
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
            return res.status(404).json({ message: "No teachers found" });
        }
        else
            return res.status(200).json({ data: teachers, message: "All teachers fetched successfully!" });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const addStudent = async (req, res) => {
    const { email } = req.body;
    const userId = req.user.id;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const student = await Student.findOne({ user: user._id });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const teacher = await Teacher.findOne({ user: userId });
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });

        if (teacher.students.some(id => id.equals(student._id))) {
            return res.status(400).json({ message: "Student already exists" });
        }

        await Teacher.findByIdAndUpdate(
            teacher._id,
            { $addToSet: { students: student._id } },
            { new: true }
        );

        return res.status(200).json({ message: "Student added successfully!" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const getTeacherByToken = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ user: req.user.id });
        return res.status(200).json({ data: teacher });
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "Invalid token." });
    }
}



module.exports = {
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
    getAllStudents,
    addStudent,
    getTeacherByToken
};