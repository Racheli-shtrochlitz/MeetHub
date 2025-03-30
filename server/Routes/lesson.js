const express=require('express');
const router=express.Router();
const { getLesson,
    addLesson,
    updateLesson,
    deleteLesson,
    getAllLessons } = require('../Controllers/lessonController');

router.get('/getLesson/:id',getLesson);
router.put('/addLesson',addLesson);
router.post('/updateLesson/:id',updateLesson);
router.delete('/deleteLesson/:id',deleteLesson);
router.get('/getAllLessons',getAllLessons);

module.exports = router;