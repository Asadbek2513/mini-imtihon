const Stuff_role = require("../model/stuffSchema");

const poststuff_role = async (req, res) => {
    try {
        const {
            stuff_id,
            role_id
        } = req.body;
        const newStuff_role = new Stuff_role({
            stuff_id,
            role_id
        });
        await newStuff_role.save();
        return res.status(201).json({
            success: true,
            message: "Rol biriktirildi",
            data: newStuff_role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getStuff_role = async (req, res) => {
    try {
        const list = await Stuff_role
          .find()
          .populate("stuff_id")
          .populate("role_id");
        return res.status(200).json({
            success: true,
            message: "Ro'yxat qaytarildi",
            date: list
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getStuff_roleById = async (req, res) => {
    try {
        const stuff_role = await Stuff_role
            .findById(req.params.id)
            .populate("stuff_id")
            .populate("role_id");
        if (!stuff_role) return res.status(404).json({
            success: false,
            message: "Topilmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Topildi",
            data: stuff_role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateStuff_role = async (req, res) => {
    try {
        const updated = await Stuff_role.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(400).json({
            success: false,
            message: "Yangilanmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Yangilandi",
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

const deleteStuff_role = async (req, res) => {
    try {
        const deleteStuff_role = await Stuff_role.findByIdAndDelete(req.params.id);
        if (!deleteStuff_role) {
            return res.status(400).json({
                success: false,
                message: "O'chirilmadi"
            });
        }
        return res.status(200).json({
            success: false,
            message: "O'chirildi",
            data: Stuff_role
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
    poststuff_role,
    getStuff_role,
    getStuff_roleById,
    updateStuff_role,
    deleteStuff_role
};