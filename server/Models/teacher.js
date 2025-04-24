const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
<<<<<<< HEAD
  subject: { type: String, required: true },
=======
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: [{ type: String, default:[] }],
>>>>>>> b0ebece9bcc4beabcdb7c892bac528580b53ab10
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],  // רשימה של תלמידים
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],  // רשימה של שיעורים
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Teacher', teacherSchema);
