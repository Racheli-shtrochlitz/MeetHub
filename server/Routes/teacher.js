const express = require('express');
const router = express.Router();
const { getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers } = require('../Controllers/teacherController');
const {checkOwnership} = require('../Controllers/checkAccess.js');


router.get('/getTeacher/:id', getTeacher);
router.put('/addTeacher',checkOwnership, addTeacher);
router.post('/updateTeacher/:id',checkOwnership, updateTeacher);
router.delete('/deleteTeacher/:id',checkOwnership, deleteTeacher);
router.get('/getAllTeachers', getAllTeachers);

module.exports = router;