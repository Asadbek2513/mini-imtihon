const Stuff = require("../model/stuffSchema");

const stuffRegister = async (req, res) => {
    try {
        const { login } = req.body;
        const stuffs = await Stuff.findOne({ login });
        if (stuffs) return res.status(400).json({
            success: false,
            message: "Bunday xodim mavjud"
        });
        const newStuff = new Stuff()
        await newStuff.save();
        return res.status(201).json({
            success: true,
            message: "Xodim qo'shishildi",
            data: newStuff
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getStuff = async (req, res) => {
    try {
        const stuffes = await Stuff.find();
        return res.status(200).json({
            success: true,
            message: "Xodimlar ro'yxati",
            date: stuffes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const getStuffById = async (req, res) => {
    try {
        const stuff = await Stuff.findById(req.params.id);
        if (!stuff) return res.status(404).json({
            success: false,
            message: "Xodim topilmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Xodim topildi",
            data: stuff
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const updateStuff = async (req, res) => {
    try {
        const stuffed = await Stuff.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!stuffed) return res.status(400).json({
            success: false,
            message: "Yangilanmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Yangilanish muvaffaqiyatli yakunlandi",
            data: stuffed
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ichki server xatosi",
            error: error.message
        });
    }
};

const deleteStuff = async (req, res) => {
    try {
        if (!await Stuff.findByIdAndDelete(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Xodim O'chirildi"
            });
        }
        return res.status(200).json({
            success: false,
            message: "O'chirildi",
            data: Stuff
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
    stuffRegister,
    getStuff,
    getStuffById,
    updateStuff,
    deleteStuff
};