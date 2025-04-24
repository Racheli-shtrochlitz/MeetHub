const express = require('express');
const router = express.Router();
const { getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers } = require('../Controllers/teacherController');
const {checkOwnership} = require('../Middlewares/checkAccess.js');

router.get('/createTeacher',checkOwnership, createTeacher);
router.get('/getTeacher/:id', getTeacher);
router.post('/updateTeacher/:id',checkOwnership, updateTeacher);
router.delete('/deleteTeacher/:id',checkOwnership, deleteTeacher);
router.get('/getAllTeachers', getAllTeachers);

module.exports = router;