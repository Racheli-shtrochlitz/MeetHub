const express = require('express');
const router = express.Router();
const { getMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getAllMaterials } = require('../Controllers/materialController');

router.get('/getMaterial/:id', getMaterial);
router.put('/addMaterial', addMaterial);
router.post('/updateMaterial/:id', updateMaterial);
router.delete('/deleteMaterial/:id', deleteMaterial);
router.get('/getAllMaterials', getAllMaterials);

module.exports = router;