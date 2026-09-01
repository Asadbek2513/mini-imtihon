const { Router } = require("express");
const lessonRoute = Router();
const {
    postLesson,
    getLesson,
    getLessonById,
    updateLesson,
    deleteLesson
} = require("../controller/lesson.controller");

const {
    lessonValidation
} = require("../validation/lessonValidation");

const validationSchema = (schema) => (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).json({
    success: false,
    message: result.error.details[0].message
  });
  next();
};

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Darslarni rejalashtirish
 */

/**
 * @swagger
 * /lesson/postLesson:
 *   post:
 *     summary: Yangi dars yaratish
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               lesson_theme:
 *                 type: String
 *               lesson_number:
 *                 type: Number
 *               group_id:
 *                 type: String
 *               lesson_date:
 *                 type: String
 *     responses:
 *       200:
 *         description: Dars rejasi yaratildi
 *       500: 
 *         description: Ichki server xatosi
 */
lessonRoute.post("/postLesson", validationSchema(lessonValidation), postLesson);

/**
 * @swagger
 * /lesson/getLesson:
 *   get:
 *     summary: Barcha darslar ro'yxatini olish
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Darslar ro'yxati
 *       500: 
 *         description: Ichki server xatosi
 */
lessonRoute.get("/getLesson", getLesson);

/**
 * @swagger
 * /lesson/getLessonById/{id}:
 *   get:
 *     summary: ID bo'yicha darsni ko'rish
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Dars topildi
 *       404:
 *         description: Dars topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
lessonRoute.get("/getLessonById/:id", getLessonById);

/**
 * @swagger
 * /lesson/updateLesson/{id}:
 *   put:
 *     summary: Darsni tahrirlash
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               lesson_theme:
 *                 type: String
 *               lesson_number:
 *                 type: Number
 *               group_id:
 *                 type: String
 *               lesson_date:
 *                 type: String
 *     responses:
 *       200:
 *         description: Dars yangilandi
 *       400:
 *         description: Dars yangilanmadi
 *       500: 
 *         description: Ichki server xatosi
 */
lessonRoute.put("/updateLesson/:id", validationSchema(lessonValidation), updateLesson);

/**
 * @swagger
 * /lesson/deleteLesson/{id}:
 *   delete:
 *     summary: Darsni o'chirish
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: O'chirildi
 *       400:
 *         description: Dars o'chirilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
lessonRoute.delete("/deleteLesson/:id", deleteLesson);

module.exports = { lessonRoute };