const express = require('express');
const router = express.Router();
const { getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers } = require('../Controllers/teacherController');

router.get('/getTeacher/:id', getTeacher);
router.put('/addTeacher', addTeacher);
router.post('/updateTeacher/:id', updateTeacher);
router.delete('/deleteTeacher/:id', deleteTeacher);
router.get('/getAllTeachers', getAllTeachers);

module.exports = router;