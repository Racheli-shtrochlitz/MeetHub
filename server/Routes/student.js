const express=require('express');
const router=express.Router();
const { getStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    getAllStudents } = require('../Controllers/studentController');

router.get('/getStudent/:id',getStudent);
router.put('/addStudent',addStudent);
router.post('/updateStudent/:id',updateStudent);
router.delete('/deleteStudent/:id',deleteStudent);
router.get('/getAllStudents',getAllStudents);

module.exports = router;
