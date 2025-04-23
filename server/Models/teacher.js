const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  subject: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],  // רשימה של תלמידים
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],  // רשימה של שיעורים
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Teacher', teacherSchema);
