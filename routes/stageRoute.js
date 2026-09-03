const { Router } = require("express");
const stageRoute = Router();
const {
    postStage,
    getStage,
    searchStage,
    getStageById,
    updateStage,
    deleteStage
} = require("../controller/stage.controller");

const {
    stageValidation
} = require("../validation/stageValidation");

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
 *   name: Stages
 *   description: Bosqich va darajalarni boshqarish API
 */

/**
 * @swagger
 * /stage/postStage:
 *   post:
 *     summary: Yangi bosqich yaratish
 *     tags: [Stages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             required:
 *               - name:
 *             properties:
 *               name:
 *                 type: String
 *     responses:
 *       201:
 *         description: Bosqich yaratildi
 *       400:
 *         description: Validatsiya xatosi
 */
stageRoute.post("/postStage", validationSchema(stageValidation), postStage);

/**
 * @swagger
 * /stage/getStage:
 *   get:
 *     summary: Barcha bosqichlar ro'yxatini olish
 *     tags: [Stages]
 *     responses:
 *       200:
 *         description: Bosqichlar ro'yxati qaytarildi
 *       500:
 *         description: Ichki server xatosi
 */
stageRoute.get("/getStage", getStage);

/**
 * @swagger
 * /stage/searchStage:
 *   get:
 *     summary: Bosqichlarni nomi bo'yicha qidirish
 *     tags: [Stages]
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
stageRoute.get("/search", searchStage);

/**
 * @swagger
 * /stage/getStageById/{id}:
 *   get:
 *     summary: ID bo'yicha bosqichni olish
 *     tags: [Stages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Bosqich topildi
 *       404:
 *         description: Topilmadi
 *       500:
 *         description: Icki server xatosi
 */
stageRoute.get("/getStageById/:id", getStageById);

/**
 * @swagger
 * /stage/updateStage/{id}:
 *   put:
 *     summary: Bosqichni tahrirlash
 *     tags: [Stages]
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
 *               name:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilanish muvaffaqiyatli yakunlandi
 *       400:
 *         description: Yangilanishda xatolik yuz berdi
 *       500: 
 *         description: Ichki server xatosi
 */
stageRoute.put("/updateStage/:id", validationSchema(stageValidation), updateStage);

/**
 * @swagger
 * /stage/deleteStage/{id}:
 *   delete:
 *     summary: Bosqichni o'chirish
 *     tags: [Stages]
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
stageRoute.delete("/deleteStage/:id", deleteStage);

module.exports = { stageRoute };