const express = require('express');
const router = express.Router();
const { getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
    getAllStudents ,
    getAllSubjects,
    addStudent,
    getTeacherByToken} = require('../Controllers/teacherController');
const {checkOwnership,authenticateUser} = require('../Middlewares/checkAccess.js');

router.get('/getAllStudents',authenticateUser, getAllStudents);
router.get('/getAllSubjects',authenticateUser, getAllSubjects);
router.post('/createTeacher',authenticateUser,checkOwnership, createTeacher);
router.get('/getTeacher/:id',authenticateUser, getTeacher);
router.post('/updateTeacher/:id',authenticateUser,checkOwnership, updateTeacher);
router.post('/addStudent',authenticateUser, addStudent);
router.delete('/deleteTeacher/:id',authenticateUser,checkOwnership, deleteTeacher);
router.get('/getAllTeachers',authenticateUser, getAllTeachers);
router.get('/getTeacherByToken',authenticateUser, getTeacherByToken);


module.exports = router;