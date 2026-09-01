const { Router } = require("express");
const studentLessonRoute = Router();
const {
    postStudent_lesson,
    getStudent_lesson,
    getStudent_lessonById,
    updateStudent_lesson,
    deleteStudent_lesson
} = require("../controller/student_lesson.controller");

const {
    studentLessonValidation
} = require("../validation/student_lessonValidation");

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
 *   name: Student Lessons (Attendance)
 */

/**
 * @swagger
 * /student-lesson/postStudent_lesson:
 *   post:
 *     summary: Talabaga davomat belgilash
 *     tags: [Student_Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             required:
 *             properties:
 *               lesson_id:
 *                 type: String
 *               student_id:
 *                 type: String
 *               is_there:
 *                 type: Boolean
 *               reason:
 *                 type: String
 *               be_paid:
 *                 type: Boolean
 *     responses:
 *       201:
 *         description: Davomat belgilandi
 *       500: 
 *         description: Ichki server xatosi
 */
studentLessonRoute.post("/postStudent_lesson", validationSchema(studentLessonValidation), postStudent_lesson);

/**
 * @swagger
 * /student-lesson/getStudent_lesson:
 *   get:
 *     summary: Barcha davomatlar ro'yxatini olish
 *     tags: [Student_Lessons]
 *     responses:
 *       200:
 *         description: Davomatlar
 *       500: 
 *         description: Ichki server xatosi
 */
studentLessonRoute.get("/getStudent_lesson", getStudent_lesson);

/**
 * @swagger
 * /student-lesson/getStudent_lessonById/{id}:
 *   get:
 *     summary: ID bo'yicha davomatni ko'rish
 *     tags: [Student_Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topildi
 *       400:
 *         description: Topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentLessonRoute.get("/getStudent_lessonById/:id", getStudent_lessonById);

/**
 * @swagger
 * /student-lesson/updateStudent_lesson/{id}:
 *   put:
 *     summary: Davomatni tahrirlash
 *     tags: [Student_Lessons]
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
 *               lesson_id:
 *                 type: String
 *               student_id:
 *                 type: String
 *               is_there:
 *                 type: Boolean
 *               reason:
 *                 type: String
 *               be_paid:
 *                 type: Boolean
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Yangilanmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentLessonRoute.put("/updateStudent_lesson/:id", validationSchema(studentLessonValidation), updateStudent_lesson);

/**
 * @swagger
 * /student-lesson/deleteStudent_lesson/{id}:
 *   delete:
 *     summary: Davomatni o'chirish
 *     tags: [Student_Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'chirildi
 *       400:
 *         description: O'chirilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentLessonRoute.delete("/deleteStudent_lesson/:id", deleteStudent_lesson);

module.exports = { studentLessonRoute };