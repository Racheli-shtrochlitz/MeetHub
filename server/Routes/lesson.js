const express = require('express');
const router = express.Router();
const { checkRole,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    getAllLessons } = require('../Controllers/lessonController');

//get lesson by id  
router.get('/getLesson/:id', getLesson);
//add lesson
router.post('/addLesson',checkRole, addLesson);
//update lesson by id
router.put('/updateLesson/:id',checkRole, updateLesson);
//delete lesson by id
router.delete('/deleteLesson/:id', checkRole,deleteLesson);
//get all lessons
router.get('/getAllLessons', getAllLessons);

module.exports = router;