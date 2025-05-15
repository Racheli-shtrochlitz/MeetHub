const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  lessonDate: { type: Date, required: true },
  zoomLink: { type: String, required: true },  // קישור זום לשיעור
  subject:{type:String},
  materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],  // חומרים שהועלו לשיעור
  recording: { type: Boolean },  // קישור להקלטת השיעור (אם יש)
  feedback: { type: String },  // משוב על השיעור
  createdAt: { type: Date, default: Date.now },
  attachments:{type:String}
});

module.exports = mongoose.model('Lesson', lessonSchema);
