const Material = require('../Models/material');

const getMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        const material = await Material.findById(id)
            .populate('lesson')
            .populate('uploadBy');
        if (!material) {
            return res.status(404).send("Material not found");
        }
        else
            return res.status(200).json(material);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const addMaterial = async (req, res) => {
    const { material } = req.body;
    try {
        const newMaterial = await Material.create(material);
        const populatedMaterial=await Material.findById(newMaterial._id)
            .populate('lesson')
            .populate('uploadBy');
        if (!populatedMaterial) {
            return res.status(404).send("Probably you didn't send correct data...");
        }
        else
            return res.status(201).json(populatedMaterial);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const updateMaterial = async (req, res) => {
    const { id } = req.params;
    const { material } = req.body;
    try {
        const newMaterial = await Material.findByIdAndUpdate({ _id: id }, {...material},{new:true})
            .populate('lesson')
            .populate('uploadBy');
        if (!newMaterial)
            return res.status(404).send("Material not found");
        else
            return res.status(200).json(newMaterial);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const deleteMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        const material = await Material.findByIdAndDelete(id)
            .populate('lesson')
            .populate('uploadBy');
        if (!material)
            return res.status(404).send("Material not found");
        else
            return res.status(200).json({metarial:material ,message: "deleted successfully!!!"});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.find({})
            .populate('lesson')
            .populate('uploadBy');
        if (!materials || materials.length === 0) {
            return res.status(404).send("Materials not found");
        }
        else
            return res.status(200).json(materials);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = {
    getMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getAllMaterials
};