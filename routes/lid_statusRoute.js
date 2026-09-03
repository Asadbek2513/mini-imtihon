const { Router } = require("express");
const lidStatusRoute = Router();
const {
    postLid_status,
    getLid_status,
    searchLid_status,
    getLid_statusById,
    updateLid_status,
    deletLid_status
} = require("../controller/lid_status.controller");

const {
    lidStatusValidation
} = require("../validation/lid_statusValidation");

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
 *   name: Lid Statuses
 *   description: Lid statuslarini boshqarish
 */

/**
 * @swagger
 * /lid-status/postLid_status:
 *   post:
 *     summary: Yangi status qo'shish
 *     tags: [Lid Statuses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             required:
 *               - status:
 *             properties:
 *               status:
 *                 type: String
 *     responses:
 *       201:
 *         description: Status yaratildi
 *       500: 
 *         description: Ichki server xatosi
 */
lidStatusRoute.post("/postLid_status", validationSchema(lidStatusValidation), postLid_status);

/**
 * @swagger
 * /lid-status/getLid_status:
 *   get:
 *     summary: Barcha statuslarni ko'rish
 *     tags: [Lid Statuses]
 *     responses:
 *       200:
 *         description: Statuslar ro'yxati
 *       500: 
 *         description: Ichki server xatosi
 */
lidStatusRoute.get("/getLid_status", getLid_status);

/**
 * @swagger
 * /lid-status/searchLid_status:
 *   get:
 *     summary: Lid statuslarini matn bo'yicha qidirish
 *     tags: [Lid Statuses]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: OK
 */
lidStatusRoute.get("/search", searchLid_status);

/**
 * @swagger
 * /lid-status/getLid_statusById/{id}:
 *   get:
 *     summary: ID bo'yicha statusni ko'rish
 *     tags: [Lid Statuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Ma'lumot topildi
 *       400:
 *         description: Bunday status topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
lidStatusRoute.get("/getLid_statusById/:id", getLid_statusById);

/**
 * @swagger
 * /lid-status/updateLid_status/{id}:
 *   put:
 *     summary: Statusni tahrirlash
 *     tags: [Lid Statuses]
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
 *               status:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Status yangilanmad
 *       500: 
 *         description: Ichki server xatosi
 */
lidStatusRoute.put("/updateLid_status/:id", validationSchema(lidStatusValidation), updateLid_status);

/**
 * @swagger
 * /lid-status/deletLid_status/{id}:
 *   delete:
 *     summary: Statusni o'chirish
 *     tags: [Lid Statuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Status o'chirilish tugatildi
 *       500: 
 *         description: Ichki server xatosi
 */
lidStatusRoute.delete("/deletLid_status/:id", deletLid_status);

module.exports = { lidStatusRoute };