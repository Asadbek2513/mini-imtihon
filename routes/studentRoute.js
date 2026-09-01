const { Router } = require("express");
const studentRoute = Router();
const {
    studentRegister,
    getStudents,
    getStudentById,
    updateStudent,
    deletStudent
} = require("../controller/student.controller");

const {
    studentValidation
} = require("../validation/studentValidation");

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
 *   name: Students
 *   description: Talabalar va o'quvchilarni boshqarish
 */

/**
 * @swagger
 * /student/studentRegister:
 *   post:
 *     summary: Yangi talaba ro'yxatdan o'tkazish
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             required:
 *             properties:
 *               lid_id:
 *                 type: String
 *               first_name:
 *                 type: String
 *               last_name:
 *                 type: String
 *               phone_number:
 *                 type: String
 *               birthday:
 *                 type: String
 *               gender:
 *                 type: String
 *     responses:
 *       201:
 *         description: Yangi o'quvchi qo'shildi
 *       400:
 *         description: Bunday o'quvchi mavjud
 *       500: 
 *         description: Ichki server xatosi
 */
studentRoute.post("/studentRegister", validationSchema(studentValidation), studentRegister);

/**
 * @swagger
 * /student/getStudents:
 *   get:
 *     summary: Barcha talabalarni ko'rish
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Talabalar ro'yxati
 *       500: 
 *         description: Ichki server xatosi
 */
studentRoute.get("/getStudents", getStudents);

/**
 * @swagger
 * /student/getStudentById/{id}:
 *   get:
 *     summary: ID bo'yicha talabani ko'rish
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Talaba topildi
 *       400:
 *         description: O'quvchi topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentRoute.get("/getStudentById/:id", getStudentById);

/**
 * @swagger
 * /student/updateStudent/{id}:
 *   put:
 *     summary: Talabani tahrirlash
 *     tags: [Students]
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
 *               lid_id:
 *                 type: String
 *               first_name:
 *                 type: String
 *               last_name:
 *                 type: String
 *               phone_number:
 *                 type: String
 *               birthday:
 *                 type: String
 *               gender:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: DYangilanmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentRoute.put("/updateStudent/:id", validationSchema(studentValidation), updateStudent);

/**
 * @swagger
 * /student/deletStudent/{id}:
 *   delete:
 *     summary: Talabani o'chirish
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Yangi o'quvchi o'chirildi.
 *       400:
 *         description: O'quvchi topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentRoute.delete("/deletStudent/:id", deletStudent);

module.exports = { studentRoute };