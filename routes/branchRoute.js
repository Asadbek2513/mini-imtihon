const { Router } = require("express");
const branchRoute = Router();
const {
  postBranch,
  getBranch,
  searchBranch,
  getBranchById,
  updateBranch,
  deleteBranch
} = require("../controller/branch.controller");

const {
  branchValidation
} = require("../validation/branchValidation");

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
 *   name: Branches
 *   description: Filiallarni boshqarish API ma'lumotlari
 */

/**
 * @swagger
 * /branch/postBranch:
 *   post:
 *     summary: Yangi filial qo'shish
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: String
 *               address:
 *                 type: String
 *               call_number:
 *                 type: String
 *     responses:
 *       201:
 *         description: Filialni qo'shish yakunlandi
 *       500:
 *         description: Ichki server xatosi
 */
branchRoute.post("/postBranch", validationSchema(branchValidation), postBranch);

/**
 * @swagger
 * /branch/getBranch:
 *   get:
 *     summary: Barcha filiallar ro'yxatini olish
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: Filiallar ro'yxati qaytarildi
 *       500:
 *         description: Ichki server xatosi
 */
branchRoute.get("/getBranch", getBranch);

/**
 * @swagger
 * /branch/searchBranch:
 *   get:
 *     summary: Filiallarni nomi bo'yicha qidirish
 *     tags: [Branches]
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
branchRoute.get("/search", searchBranch);

/**
 * @swagger
 * /branch/getBranchById/{id}:
 *   get:
 *     summary: ID bo'yicha filial ma'lumotini olish
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Topilmadi
 *       404:
 *         description: Ma'lumot topildi
 *       500:
 *         description: Ichki server xatosi
 */
branchRoute.get("/getBranchById/:id", getBranchById);

/**
 * @swagger
 * /branch/updateBranch/{id}:
 *   put:
 *     summary: Filial ma'lumotlarini tahrirlash
 *     tags: [Branches]
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
 *               address:
 *                 type: String
 *               call_number:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilanishda xatolik yuz berdi
 *       400:
 *         description: Yangilanish bajarildi
 *       500:
 *         description: Ichki server xatosi
 */
branchRoute.put("/updateBranch/:id", validationSchema(branchValidation), updateBranch);

/**
 * @swagger
 * /branch/deleteBranch/{id}:
 *   delete:
 *     summary: Filialni o'chirish
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Ma'lumot o'chirildi
 *       400:
 *         description: Topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
branchRoute.delete("/deleteBranch/:id", deleteBranch);

module.exports = { branchRoute };