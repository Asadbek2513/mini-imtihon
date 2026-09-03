const Branch = require("../model/branchSchema");

const postBranch = async (req, res) => {
    try {
        const {
            name,
            address,
            call_number
        } = req.body;
        const newBranch = new Branch({
            name,
            address,
            call_number
        });
        return res.status(201).json({
            success: true,
            message: "Filialni qo'shish yakunlandi",
            data: newBranch
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getBranch = async (req, res) => {
    try {
        const branches = await Branch.find();
        return res.status(200).json({
            success: true,
            message: "Filiallar ro'yxati qaytarildi",
            data: branches
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const searchBranch = async (req, res) => {
    try {
        const { q } = req.query;
        const branch = await Branch.find({
            name: {
                $regex: q || "",
                $options: "i"
            }
        });
        return res.status(200).json({
            success: true,
            data: branch
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) return res.status(404).json({
            success: false,
            message: "Topilmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Ma'lumot topildi",
            data: branch
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateBranch = async (req, res) => {
    try {
        const updated = await Branch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(400).json({
            success: false,
            message: "Yangilanishda xatolik yuz berdi"
        });
        return res.status(200).json({
            success: true,
            message: "Yangilanish bajarildi",
            data: updated
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteBranch = async (req, res) => {
    try {
        const deleteBranch = await Branch.findByIdAndDelete(req.params.id);
        if (!deleteBranch) {
            return res.status(400).json({
                success: false,
                message: "Topilmadi"
            });
        }
        return res.status(200).json({
            success: false,
            message: "Ma'lumot o'chirildi"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

module.exports = {
    postBranch,
    getBranch,
    searchBranch,
    getBranchById,
    updateBranch,
    deleteBranch
};