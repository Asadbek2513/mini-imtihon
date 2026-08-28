const { Router } = require("express");
const lessonRouter = Router();
const {
    createLesson,
    markAttendance,
    getAttendanceList
} = require("../controller/lesson.controller");

const {
    lessonValidationSchema,
    attendanceValidationSchema
} = require("../validation/lessonValidation");

const validationSchema = (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details.message);
    next();
};

/**
 * @swagger
 * tags:
 *   name: Lessons & Attendance
 *   description: Darslar jadvali va talabalar davomati API ma'lumotlari
 */

/**
 * @swagger
 * /lesson/create:
 *   post:
 *     summary: Dars mavzusi va rejasini yaratish
 *     tags: [Lessons & Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               group_name:
 *                 type: string
 *               lesson_title:
 *                 type: string
 *               lesson_date:
 *                 type: string
 *               stage_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dars rejalashtirildi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Ichki server xatosi
 */
lessonRouter.post("/create", validationSchema(lessonValidationSchema), createLesson);

/**
 * @swagger
 * /lesson/attendance:
 *   post:
 *     summary: Talabaga dars yoki davomat bahosini qo'yish
 *     tags: [Lessons & Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               student_id:
 *                 type: string
 *                 description: O'quvchi ID raqami
 *               lesson_id:
 *                 type: string
 *                 description: Dars ID raqami
 *               is_present:
 *                 type: boolean
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Davomat yoki baholash saqlandi
 *       400:
 *         description: Validatsiya yoki ID xatosi
 *       500:
 *         description: Ichki server xatosi
 */
lessonRouter.post("/attendance", validationSchema(attendanceValidationSchema), markAttendance);

/**
 * @swagger
 * /lesson/attendance/all:
 *   get:
 *     summary: Davomatlar va baholashlar tarixini olish
 *     tags: [Lessons & Attendance]
 *     responses:
 *       200:
 *         description: Davomat ro'yxati talaba ma'lumotlari bilan qaytarildi
 *       500:
 *         description: Server xatosi
 */
lessonRouter.get("/attendance/all", getAttendanceList);

module.exports = { lessonRouter };