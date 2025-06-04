const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // הצפנת סיסמאות
  roles: {
    type: [String],
    enum: ['teacher', 'student'],
    default: [],
  },
  verificationEmailCode: { type: String, default: null },//for email verification
  profileImage: { type: String },
  activeRole:{type:String,enum: ['teacher', 'student']},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
