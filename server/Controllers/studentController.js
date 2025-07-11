const Student = require('../Models/student');
const teacher = require('../Models/teacher');

const getAllTeachers = async (req, res) => {
    const id = req.user.id;
    try {
        const teachers = await teacher.find({ students: id }).populate('user');
        if (!teachers || teachers.length === 0) {
            return res.status(404).json({message:"No teachers found"});
        }
        else
        {
            return res.status(200).json({data:teachers, message:"get all teachers successfully"});
        }
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

}

const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id)
            .populate('lessons')
            .populate('user');
        if (!student) {
            return res.status(404).json({message:"Student not found"});
        }
        else
            return res.status(200).json({data:student});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create({
            //המקרה הראשון להרשמת משתמש חדש והשני להוספת פרופיל (שעבר דרך אימות הטוקן)
            user: req.userId || req.user.id,
            lessons: req.lessons || []
        });

        return newStudent;
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    try {
        const newStudent = await Student.findByIdAndUpdate({ _id: id },  {...student} ,{ new: true })
            .populate('lessons')
            .populate('user');
        if (!newStudent)
            return res.status(404).json({message:"Student not found"});
        else
            return res.status(200).json({data:newStudent, message:"Student updated successfully!"});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id)
            .populate('lessons')
            .populate('user');
        if (!student)
           return res.status(404).json({message:"Student not found"});
        else
            return res.status(200).json({data:student ,message: "deleted successfully!!!"});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({})
            .populate('lessons')
            .populate('user');
        if (!students || students.length == 0) {
            return res.status(404).json({message:"No students found"});
        }
        else
            return res.status(200).json({data:students, message: "All students fetched successfully!"});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = {
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getAllTeachers
};