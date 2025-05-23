const express=require('express');
const router=express.Router();
const { getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getAllTeachers } = require('../Controllers/studentController');
const {checkOwnership} = require('../Middlewares/checkAccess.js');
getAllTeachers
router.post('/createStudent/:id',checkOwnership, createStudent);
router.get('/getStudent/:id',getStudent);
router.post('/updateStudent/:id',checkOwnership, updateStudent);
router.delete('/deleteStudent/:id',checkOwnership, deleteStudent);
router.get('/getAllStudents',getAllStudents);
router.get('/getAllTeachers',getAllTeachers);

module.exports = router;
