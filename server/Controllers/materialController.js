const Material = require('../Models/material');

const getMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        const material = await Material.findById(id)
            .populate('lesson')
            .populate('uploadBy');
        if (!material) {
             res.send("Material not found").status(404);
        }
        else
         res.status(200).send(material);
    } catch (err) {
        console.error(err.message);
         res.status(500).send("Internal server error");
    }
};

const addMaterial = async (req, res) => {
    const { material } = req.body;
    try {
        const newMaterial = await Material.create(material)
            .populate('lesson')
            .populate('uploadBy');
        if (!newMaterial) {
            res.send("Probably you didn't send correct data...").status(404);
        }
        else
        res.status(201).send(newMaterial);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};

const updateMaterial = async (req, res) => {
    const {id}=req.params;
    const { material } = req.body;
    try {
        const newMaterial = await Material.findByIdAndUpdate({ _id: id}, { material})
            .populate('lesson')
            .populate('uploadBy');
        if (!newMaterial)
            res.send("Material not found").status(404);
        else
        res.status(200).send(newMaterial);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const deleteMaterial = async (req, res) => { 
    const {id}=req.params;
    try {
        const material=await Material.findByIdAndDelete(id)
            .populate('lesson')
            .populate('uploadBy');
        if (!material)
            res.send("Material not found").status(404);
        else
        res.status(200).send(material +"deleted successfully!!!");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

const getAllMaterials = async (req, res) => {
    try{
        console.log("Fetching Materials...");
        const materials = await Material.find({})
            .populate('lesson')
            .populate('uploadBy');
        if (!materials||materials.length===0) {
            res.send("Materials not found").status(404);
        }
        else
         res.status(200).send(materials);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
 }

module.exports = {
    getMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getAllMaterials
};