const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    fileName:{type:String,required:true},
    filePath:{type:String,required:true},
    type:{type:String,enum:['pdf','docx','pptx','mp4','mp3','image','text'],required:true},
    lesson:{type:Schema.Types.ObjectId,ref:'Lesson',required:true},
    uploadBy:{type:Schema.Types.ObjectId,ref:'Techer',required:true},
    uploadDate:{type:Date,default:Date.now},
});

module.exports = mongoose.model('Material', materialSchema);