const { Router } = require("express");
const reasonLidRoute = Router();
const {
    postReason_lid,
    getReason_lid,
    getReason_lidById,
    updateReason_lid,
    deletReason_lid
} = require("../controller/reason_lid.controller");

const {
    reasonLidValidation
} = require("../validation/reason_lidValidation");

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
 *   name: Reason Lids
 *   description: Lid rad etilishi sabablari
 */

/**
 * @swagger
 * /reason_lid/postReason_lid:
 *   post:
 *     summary: Yangi rad sababi qo'shish
 *     tags: [Reason Lids]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason_lid:
 *             properties:
 *               reason_lid:
 *                 type: String
 *     responses:
 *       201:
 *         description: Rad sababi qo'shildi
 *       500: 
 *         description: Ichki server xatosi
 */
reasonLidRoute.post("/postReason_lid", validationSchema(reasonLidValidation), postReason_lid);

/**
 * @swagger
 * /reason_lid/getReason_lid:
 *   get:
 *     summary: Barcha rad sabablarini olish
 *     tags: [Reason Lids]
 *     responses:
 *       200:
 *         description: Sabablar ro'yxati
 *       500: 
 *         description: Ichki server xatosi
 */
reasonLidRoute.get("/getReason_lid", getReason_lid);

/**
 * @swagger
 * /reason_lid/getReason_lidById/{id}:
 *   get:
 *     summary: ID bo'yicha sababni olish
 *     tags: [Reason Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Sabab topildi
 *       400:
 *         description: Topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
reasonLidRoute.get("/getReason_lidById/:id", getReason_lidById);

/**
 * @swagger
 * /reason_lid/updateReason_lid/{id}:
 *   put:
 *     summary: Sababni tahrirlash
 *     tags: [Reason Lids]
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
 *               reason_lid:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Qo'shilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
reasonLidRoute.put("/updateReason_lid/:id", validationSchema(reasonLidValidation), updateReason_lid);

/**
 * @swagger
 * /reason_lid/deletReason_lid/{id}:
 *   delete:
 *     summary: Sababni o'chirish
 *     tags: [Reason Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: O'chirildi
 *       500: 
 *         description: Ichki server xatosi
 */
reasonLidRoute.delete("/deletReason_lid/:id", deletReason_lid);

module.exports = { reasonLidRoute };