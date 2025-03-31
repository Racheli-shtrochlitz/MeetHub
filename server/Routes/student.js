const express=require('express');
const router=express.Router();
const { getStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    getAllStudents } = require('../Controllers/studentController');
const {checkOwnership} = require('../Controllers/checkAccess.js');

router.get('/getStudent/:id',getStudent);
router.put('/addStudent',checkOwnership, addStudent);
router.post('/updateStudent/:id',checkOwnership, updateStudent);
router.delete('/deleteStudent/:id',checkOwnership, deleteStudent);
router.get('/getAllStudents',getAllStudents);

module.exports = router;
