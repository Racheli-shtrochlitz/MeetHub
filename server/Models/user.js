const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // הצפנת סיסמאות
  isTeacher: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  student: { type: mongoose.Schema.types.objectId, required: true},
});

module.exports = mongoose.model('User', userSchema);
