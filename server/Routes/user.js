const express = require('express');
const router = express.Router();
const {authenticateUser}=require('../Middlewares/checkAccess')
const { signIn,
    signUp,
    addProfile,
    getAllLessons
} = require('../Controllers/userController');

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/addProfile',authenticateUser,addProfile);
router.get('/getAllLessons',authenticateUser,getAllLessons);


module.exports = router;