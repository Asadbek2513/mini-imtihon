const Student_lesson = require("../model/student_lessonSchema");

const postStudent_lesson = async (req, res) => {
    try {
        const newStudent_lesson = new Student_lesson(req.body);
        await newStudent_lesson.save();
        return res.status(201).json({
            success: true,
            message: "Davomat belgilandi",
            data: newStudent_lesson
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const getStudent_lesson = async (req, res) => {
    try {
        const list = await Student_lesson
            .find()
            .populate("lesson_id")
            .populate("student_id");
        return res.status(200).json({
            success: true,
            message: "Davomatlar",
            data: list
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const searchLesson = async (req, res) => {
    try {
        const { q } = req.query;
        const data = await Lesson.find({
            lesson_theme: {
                $regex: q || "",
                $options: "i"
            }
        }).populate("group_id");
        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


const getStudent_lessonById = async (req, res) => {
    try {
        const item = await Student_lesson
            .findById(req.params.id)
            .populate("lesson_id")
            .populate("student_id");
        if (!item) return res.status(404).json({
            success: false,
            message: "Topilmadi"
        });
        return res.status(200).json({
            success: true,
            message: "Topildi",
            data: item
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const updateStudent_lesson = async (req, res) => {
    try {
        const updated = await Student_lesson.findByIdAndUpdate(
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
            message: "Icki server xatosi",
            error: error.message
        });
    }
};

const deleteStudent_lesson = async (req, res) => {
    try {
        if (!await Student_lesson.findByIdAndDelete(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "O'chirilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "O'chirildi"
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
    postStudent_lesson,
    getStudent_lesson,
    searchLesson,
    getStudent_lessonById,
    updateStudent_lesson,
    deleteStudent_lesson
};