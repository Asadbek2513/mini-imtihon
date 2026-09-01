const { Router } = require("express");
const paymentRoute = Router();
const {
    postPayment,
    getPayment,
    getPaymentById,
    updatePayment,
    deletePayment
} = require("../controller/payment.controller");

const {
    paymentValidation
} = require("../validation/paymentValidation");

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
 *   name: Payments
 *   description: To'lovlarni boshqarish API
 */

/**
 * @swagger
 * /payment/postPayment:
 *   post:
 *     summary: Yangi to'lovni rasmiylashtirish
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             required:
 *             properties:
 *               student_id:
 *                 type: String
 *               payment_last_date:
 *                 type: String
 *                 format: date
 *               payment_date:
 *                 type: String
 *               price:
 *                 type: Number
 *               is_paid:
 *                 type: Boolean
 *               total_attent:
 *                 type: Number
 *     responses:
 *       201:
 *         description: To'lov qabul qilindi
 *       500: 
 *         description: Ichki server xatosi
 */
paymentRoute.post("/postPayment", validationSchema(paymentValidation), postPayment);

/**
 * @swagger
 * /payment/getPayment:
 *   get:
 *     summary: Barcha to'lovlar ro'yxatini olish
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: To'lovlar ro'yxati
 *       500: 
 *         description: Ichki server xatosi
 */
paymentRoute.get("/getPayment", getPayment);

/**
 * @swagger
 * /payment/getPaymentById/{id}:
 *   get:
 *     summary: ID bo'yicha to'lovni ko'rish
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: To'lov topildi
 *       400:
 *         description: To'lov topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
paymentRoute.get("/getPaymentById/:id", getPaymentById);

/**
 * @swagger
 * /payment/updatePayment/{id}:
 *   put:
 *     summary: To'lov ma'lumotlarini tahrirlash
 *     tags: [Payments]
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
 *               payment_last_date:
 *                 type: String
 *                 format: date
 *               payment_date:
 *                 type: String
 *               price:
 *                 type: Number
 *               is_paid:
 *                 type: Boolean
 *               total_attent:
 *                 type: Number
 *     responses:
 *       200:
 *         description: To'lov yangilandi
 *       500: 
 *         description: Ichki server xatosi
 */
paymentRoute.put("/updatePayment/:id", validationSchema(paymentValidation), updatePayment);

/**
 * @swagger
 * /payment/deletePayment/{id}:
 *   delete:
 *     summary: To'lovni o'chirish
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: O'chirildi
 *       400:
 *         description: To'lov o'chirilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
paymentRoute.delete("/deletePayment/:id", deletePayment);

module.exports = { paymentRoute };