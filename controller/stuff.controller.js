const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stuff = require("../model/stuffSchema");
const { searchIndex } = require("../model/reason_lidSchema");

const stuffRegister = async (req, res) => {
    try {
        const { login, parol } = req.body;
        const stuffs = await Stuff.findOne({ login });
        if (stuffs) return res.status(400).json({
            success: false,
            message: "Bunday xodim mavjud"
        });
        const hashedPassword = await bcrypt.hash(parol, 10);
        const newStuff = new Stuff({
            ...req.body,
            parol: hashedPassword
        });
        await newStuff.save();
        return res.status(201).json({
            success: true,
            message: "Xodim qo'shildi",
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

const stuffLogin = async (req, res) => {
    try {
        const { login, parol } = req.body;
        const stuff = await Stuff.findOne({ login });
        if (!stuff) return res.status(400).json({
            success: false,
            message: "Login noto'g'ri"
        });
        const math = await bcrypt.compare(parol, stuff.parol);
        if (!math) return res.status(400).json({
            success: false,
            message: "Parol noto'g'ri"
        });
        const token = jwt.sign(
            { id: stuff._id},
            process.env.JWT_SECRET || "secret_key",
            { expiresIn: "24" }
        );
        return res.status(200).json({
            success: true,
            message: "Tizimga kirdingiz",
            data: token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const searchStuff = async (req, res) => {
    try {
        const { q } = req.query;
        const results = await Stuff.find({
            $or: [
                { first_name: { $regex: q || "", $options: "i" } },
                { last_name: { $regex: q || "", $options: "i" } }
            ]
        });
        return res.status(200).json({
            success: true,
            data: results
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
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
        const deleteStuff = await Stuff.findByIdAndDelete(req.params.id);
        if (!deleteStuff) {
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
    stuffLogin,
    searchStuff,
    getStuffById,
    updateStuff,
    deleteStuff
};