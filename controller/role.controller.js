const Role = require("../model/roleSchema");

const postRole = async (req, res) => {
    try {
        const {
            name
        } = req.body
        const newRole = new Role({
            name
        });
        await newRole.save();
        return res.status(201).json({
            success: true,
            message: "Role qo'shildi",
            data: newRole
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getRole = async (req, res) => {
    try {
        const roles = await Role.find();
        return res.status(200).json({
            success: true,
            message: "Role qaytarildi",
            date: roles
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({
            success: false,
            message: "Rol topilmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Rol topildi",
            data: role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateRole = async (req, res) => {
    try {
        const updated = await Role.findByIdAndUpdate(
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
            message: "Yangilanish muvaffaqiyatli yakunlandi",
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

const deleteRole = async (req, res) => {
    try {
        if (!await Role.findByIdAndDelete(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "O'chirilmadi"
            });
        }
        return res.status(200).json({
            success: false,
            message: "O'chirildi",
            data: Role
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
    postRole,
    getRole,
    getRoleById,
    updateRole,
    deleteRole
};