const express = require('express');
const router = express.Router();
const { getMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getAllMaterials } = require('../Controllers/materialController');
const {checkRole} = require('../Middlewares/checkAccess');


router.get('/getMaterial/:id', getMaterial);
router.put('/addMaterial', checkRole('teacher'), addMaterial);
router.post('/updateMaterial/:id', checkRole('teacher'), updateMaterial);
router.delete('/deleteMaterial/:id', checkRole('teacher'), deleteMaterial);
router.get('/getAllMaterials', getAllMaterials);

module.exports = router;