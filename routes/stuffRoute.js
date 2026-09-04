const { Router } = require("express");
const stuffRoute = Router();
const {
  stuffRegister,
  getStuff,
  stuffLogin,
  searchStuff,
  getStuffById,
  updateStuff,
  deleteStuff,
} = require("../controller/stuff.controller");

const {
  stuffValidation
} = require("../validation/stuffValidation");

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
 *   name: Staff
 *   description: Xodimlarni boshqarish
 */

/**
 * @swagger
 * /stuff/stuffRegister:
 *   post:
 *     summary: Yangi xodim ro'yxatdan o'tkazish
 *     tags: [Staff]
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
 *               login:
 *                 type: String
 *               parol:
 *                 type: String
 *               is_active:
 *                 type: Boolean
 *     responses:
 *       201:
 *         description: Xodim qo'shishildi
 *       400:
 *         description: Bunday xodim mavjud
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoute.post("/stuffRegister", validationSchema(stuffValidation), stuffRegister);

/**
 * @swagger
 * /stuff/getStuff:
 *   get:
 *     summary: Barcha xodimlarni ko'rish
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Xodimlar ro'yxati
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoute.get("/getStuff", getStuff);

/**
 * @swagger
 * /stuff/searchStuff:
 *   get:
 *     summary: Xodimlarni ismi yoki familiyasi bo'yicha qidirish
 *     tags: [Staff]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv muvaffaqqiyatli yakunlandi
 *       500:
 *         description: Ichki server xatosi
 */
stuffRoute.get("/search", searchStuff);

/**
 * @swagger
 * /stuff/stuffLogin:
 *   post:
 *     summary: Xodim tizimga kirishi (Login)
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               parol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli kirildi
 *       500:
 *         description: Ichki server xatosi
 */
stuffRoute.post("/login", stuffLogin);

/**
 * @swagger
 * /stuff/getStuffById/{id}:
 *   get:
 *     summary: ID bo'yicha xodimni olish
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xodim topildi
 *       400:
 *         description: Xodim topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoute.get("/getStuffById/:id", getStuffById);

/**
 * @swagger
 * /stuff/updateStuff/{id}:
 *   put:
 *     summary: Xodim ma'lumotlarini tahrirlash
 *     tags: [Staff]
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
 *               login:
 *                 type: String
 *               parol:
 *                 type: String
 *               is_active:
 *                 type: Boolean
 *     responses:
 *       200:
 *         description: Yangilanmadi
 *       400:
 *         description: Yangilanish muvaffaqiyatli yakunlandi
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoute.put("/updateStuff/:id", validationSchema(stuffValidation), updateStuff);

/**
 * @swagger
 * /stuff/deleteStuff/{id}:
 *   delete:
 *     summary: Xodimni o'chirish
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xodim o'chirildi
 *       400:
 *         description: Xodim o'chirilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoute.delete("/deleteStuff/:id", deleteStuff);

module.exports = { stuffRoute };