const express = require('express');
const router = express.Router();
const {authenticateUser}=require('../Middlewares/checkAccess')
const { signIn,
    signUp,
    addProfile
} = require('../Controllers/userController');

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/addProfile',authenticateUser,addProfile);

module.exports = router;