const { Router } = require("express");
const students = Router();

const {
    studentRegister,
    getStudents,
    updateStudent,
    deletStudent
} = require("../controller/student.controller");

const {
    studentValidationSchema,
    updateStudentValidationSchema
} = require("../validation/studentValidation");

const validationSchema = (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details.message);
    next();
};

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: O'quvchilar bilan ishlash uchun API endpointlari
 */

/**
 * @swagger
 * /student/studentRegister:
 *   post:
 *     summary: Yangi o'quvchi ro'yxatdan o'tkazish
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: O'quvchi muvaffaqiyatli ro'yhatga olindi
 *       400:
 *         description: Validatsiya xatosi
 */
students.post("/studentRegister", validationSchema(studentValidationSchema), studentRegister);

/**
 * @swagger
 * /student/getStudents:
 *   get:
 *     summary: O'quvchilar ro'yxatini olish
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Ro'yxatga olindi
 *       500:
 *         description: Ichki server xatosi
 */
students.get("/getStudents", getStudents);

/**
 * @swagger
 * /student/updateStudent/{id}:
 *   put:
 *     summary: O'quvchilarning ma'lumotlarini ID orqali yangilash
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli yangilandi
 *       404:
 *         description: Muvaffaqiyatli yangilanmadi
 */
students.put("/updateStudent/:id", validationSchema(updateStudentValidationSchema), updateStudent);

/**
 * @swagger
 * /student/deletStudent/{id}:
 *   delete:
 *     summary: O'quvchini o'chirish
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'quvchi muvaffaqiyatli o'chirildi
 *       500:
 *         description: Ma'lumotlar o'chirilmadi
 */
students.delete("/deletStudent/:id", deletStudent);

module.exports = { students };