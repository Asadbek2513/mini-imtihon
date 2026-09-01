const Stage = require("../model/stageSchema");

const postStage = async (req, res) => {
    try {
        const {
            name
        } = req.body;
        const newStage = new Stage({
            name
        });
        await newStage.save();
        return res.status(201).json({
            success: true,
            message: "Bosqich yaratildi",
            data: newStage
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getStage = async (req, res) => {
    try {
        const stages = await Stage.find();
        return res.status(200).json({
            success: true,
            message: "Bosqichlar ro'yxati qaytarildi",
            date: stages
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const getStageById = async (req, res) => {
    try {
        const stage = await Branch.findById(req.params.id);
        if (!stage) return res.status(404).json({
            success: false,
            message: "Bosqich topildi"
        });
        return res.status(200).json({
            success: true,
            message: "Topildi",
            data: stage
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const updateStage = async (req, res) => {
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
            message: "Yangilanish muvaffaqiyatli yakunlandi",
            data: updated
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const deleteStage = async (req, res) => {
    try {
        if (!await Stage.findByIdAndDelete(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "O'chirilmadi"
            });
        }
        return res.status(200).json({
            success: false,
            message: "O'chirildi",
            data: Stage
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

module.exports = {
    postStage,
    getStage,
    getStageById,
    updateStage,
    deleteStage
};