const express = require('express');
const router = express.Router();
const { getUser,
    addUser,
    updateUser,
    deleteUser,
    getAllUsers } = require('../Controllers/userController');

router.get('/getUser/:id', getUser);
router.put('/addUser', addUser);
router.post('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getAllUsers', getAllUsers);

module.exports = router;