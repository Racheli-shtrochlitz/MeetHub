const express = require('express');
const router = express.Router();
const { getLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    getAllLessons } = require('../Controllers/lessonController');
const { checkRole } = require('../Middlewares/checkAccess');


//get lesson by id  
router.get('/getLesson/:id', getLesson);
//add lesson
router.post('/addLesson',checkRole('teacher'), addLesson);
//update lesson by id
router.put('/updateLesson/:id', checkRole('teacher'), updateLesson);
//delete lesson by id
router.delete('/deleteLesson/:id',  checkRole('teacher'),deleteLesson);
//get all lessons
router.get('/getAllLessons', getAllLessons);

module.exports = router;