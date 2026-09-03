const { Router } = require("express");
const lidRoute = Router();
const {
    lidRegister,
    getLid,
    searchLid,
    getLidById,
    updateLid,
    deletLid
} = require("../controller/lid.controller");

const {
    lidValidation
} = require("../validation/lidValidation");

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
 *   name: Lids
 *   description: Lidlar bo'limi
 */

/**
 * @swagger
 * /lid/lidRegister:
 *   post:
 *     summary: Yangi lid yaratish
 *     tags: [Lids]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             required:
 *             properties:
 *               first_name:
 *                 type: String
 *               last_name:
 *                 type: String
 *               phone_number:
 *                 type: String
 *               lid_stage_id:
 *                 type: String
 *               test_date:
 *                 type: String
 *                 format: date
 *               trial_lesson_date:
 *                 type: String
 *               trial_lesson_time:
 *                 type: String
 *               trial_lesson_group_id:
 *                 type: String
 *               lid_status_id:
 *                 type: String
 *               cancel_reason_id:
 *                 type: String
 *     responses:
 *       201:
 *         description: Ma'lumot muvaffaqiyatli qo'shildi
 *       500: 
 *         description: Ichki server xatosi
 */
lidRoute.post("/lidRegister", validationSchema(lidValidation), lidRegister);

/**
 * @swagger
 * /lid/getLid:
 *   get:
 *     summary: Barcha lidlar ro'yxatini olish
 *     tags: [Lids]
 *     responses:
 *       200:
 *         description: Lidlar ro'yxati qaytarildi
 *       500: 
 *         description: Ichki server xatosi
 */
lidRoute.get("/getLid", getLid);

/**
 * @swagger
 * /lid/searchLid:
 *   get:
 *     summary: Lidlarni ism yoki telefon bo'yicha qidirish
 *     tags: [Lids]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Ichki server xatosi
 */
lidRoute.get("/search", searchLid);

/**
 * @swagger
 * /lid/{id}:
 *   get:
 *     summary: ID bo'yicha lid ma'lumotini olish
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lid topildi
 *       400:
 *         description: Bunday lid topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
lidRoute.get("/getLidById/:id", getLidById);

/**
 * @swagger
 * /lid/updateLid/{id}:
 *   put:
 *     summary: Lid ma'lumotlarini o'zgartirish
 *     tags: [Lids]
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
 *               first_name:
 *                 type: String
 *               last_name:
 *                 type: String
 *               phone_number:
 *                 type: String
 *               lid_stage_id:
 *                 type: String
 *               test_date:
 *                 type: String
 *               trial_lesson_date:
 *                 type: String
 *               trial_lesson_time:
 *                 type: String
 *               trial_lesson_group_id:
 *                 type: String
 *               lid_status_id:
 *                 type: String
 *               cancel_reason_id:
 *                 type: String
 *     responses:
 *       200:
 *         description: Lid yangilandi
 *       400:
 *         description: Bunday lid topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
lidRoute.put("/updateLid/:id", validationSchema(lidValidation), updateLid);

/**
 * @swagger
 * /lid/deletLid/{id}:
 *   delete:
 *     summary: Lidni o'chirish
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lid o'chirildi
 *       400:
 *         description: Delet bajarildi
 *       500: 
 *         description: Ichki server xatosi
 */
lidRoute.delete("/deletLid/:id", deletLid);

module.exports = { lidRoute };