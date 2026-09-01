const { Router } = require("express");
const studentGroupRoute = Router();
const {
    postStudent_group,
    getStudent_group,
    getStudent_groupById,
    updateStudent_group,
    deletStudent_group
} = require("../controller/student_group.controller");

const {
    studentGroupValidation
} = require("../validation/student_groupValidation");

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
 *   name: Student Groups
 *   description: Talabalarni guruhga biriktirish
 */

/**
 * @swagger
 * /student-group/postStudent_group:
 *   post:
 *     summary: Talabani guruhga biriktirish
 *     tags: [Student Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               student_id:
 *                 type: String
 *               group_id:
 *                 type: String
 *     responses:
 *       201:
 *         description: Yangi o'quvchi guruhga biriktirildi qo'shildi
 *       500: 
 *         description: Ichki server xatosi
 */
studentGroupRoute.post("/postStudent_group", validationSchema(studentGroupValidation), postStudent_group);

/**
 * @swagger
 * /student-group/getStudent_group:
 *   get:
 *     summary: Talaba va guruhlar bog'lanishlarini olish
 *     tags: [Student Groups]
 *     responses:
 *       200:
 *         description: Ro'yxat qaytarildi
 *       500: 
 *         description: Ichki server xatosi
 */
studentGroupRoute.get("/getStudent_group", getStudent_group);

/**
 * @swagger
 * /student-group/getStudent_groupById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Student Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Topildi
 *       400:
 *         description: O'quvchi topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentGroupRoute.get("/getStudent_groupById/:id", getStudent_groupById);

/**
 * @swagger
 * /student-group/updateStudent_group/{id}:
 *   put:
 *     summary: Biriktirishni yangilash
 *     tags: [Student Groups]
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
 *               student_id:
 *                 type: String
 *               group_id:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: O'quvchi topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentGroupRoute.put("/updateStudent_group/:id", validationSchema(studentGroupValidation), updateStudent_group);

/**
 * @swagger
 * /student-group/deletStudent_group/{id}:
 *   delete:
 *     summary: Biriktirishni o'chirish
 *     tags: [Student Groups]
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
 *         description: Dars o'chirilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
studentGroupRoute.delete("/deletStudent_group/:id", deletStudent_group);

module.exports = { studentGroupRoute };