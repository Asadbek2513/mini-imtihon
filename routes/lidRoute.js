const { Router } = require("express");
const lids = Router();

const {
    lidRegister,
    getLid,
    updateLid,
    deletLid
} = require("../controller/lid.controller");

const {
    lidValidationSchema,
    updateLidValidationSchema
} = require("../validation/lidValidation");

const validationSchema = (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details.message);
    next();
};

/**
 * @swagger
 * tags:
 *   name: Lids
 *   description: Yaxshi mijozlar bilan ishlash uchun API ma'lumotlari
 */

/**
 * @swagger
 * /lid/lidRegister:
 *   post:
 *     summary: Yangi Lid qo'shish
 *     tags: [Lids]
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
 *               status:
 *                 type: string
 *               reason:
 *                 type: string
 *               branch:
 *                 type: string
 *               created_by:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lid muvaffaqiyatli yaratildi
 *       400:
 *         description: Lid xatosi
 *       500:
 *         description: Ichki server xatosi
 */
lids.post("/lidRegister", validationSchema(lidValidationSchema), lidRegister);

/**
 * @swagger
 * /lid/getLid:
 *   get:
 *     summary: Lidlar ro'yxatini olish
 *     tags: [Lids]
 *     responses:
 *       200:
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       500:
 *         description: Ichki server xatosi
 */
lids.get("/getLid", getLid);

/**
 * @swagger
 * /lid/updateLid/{id}:
 *   put:
 *     summary: Lid ma'lumotlarini yangilash
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Lidning ID raqami
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Lid muvaffaqiyatli yangilandi
 *       404:
 *         description: Lid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
lids.put("/updateLid/:id", validationSchema(updateLidValidationSchema), updateLid);

/**
 * @swagger
 * /lid/deletLid/{id}:
 *   delete:
 *     summary: Lidni tizimdan o'chirish
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O'chiriladigan lidning ID raqami
 *     responses:
 *       200:
 *         description: Lid muvaffaqiyatli o'chirildi
 *       404:
 *         description: Lid topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
lids.delete("/deletLid/:id", deletLid);

module.exports = { lids };