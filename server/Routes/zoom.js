const express = require('express');
const router = express.Router();
const { createMeeting}=require('../Controllers/zoomController')
const { checkRole } = require('../Middlewares/checkAccess');

//add meeting
router.post('/createMeeting/:id',checkRole('teacher'), createMeeting);


module.exports = router;