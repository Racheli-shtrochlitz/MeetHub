const express = require('express');
const router = express.Router();
const {authenticateUser}=require('../Middlewares/checkAccess')
const { signIn,
    signUp,
    addProfile,
    getAllLessons
} = require('../Controllers/userController');

router.post('/signIn', (req, res) => {return res.status(200).json("signIn")});
router.post('/signUp', signUp);
router.post('/addProfile',authenticateUser,addProfile);
router.get('/getAllLessons',authenticateUser,getAllLessons);


module.exports = router;