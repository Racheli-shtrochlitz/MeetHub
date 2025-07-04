const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../Middlewares/checkAccess')
const { signIn,
    signUp,
    addProfile,
    getAllLessons,
    getUserByToken,
    updateUser,
    changeActiveRole
} = require('../Controllers/userController');

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.put('/updateUser', authenticateUser, updateUser);
router.post('/addProfile', authenticateUser, addProfile);
router.post('/changeActiveRole', authenticateUser, changeActiveRole);
router.get('/getAllLessons', authenticateUser, getAllLessons);
router.get('/getUserByToken', getUserByToken);


module.exports = router;