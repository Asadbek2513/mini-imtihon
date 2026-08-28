const { Router } = require("express");
const payments = Router();

const {
    paymentRegister,
    getPayment
} = require("../controller/payment.controller");

const { paymentValidationSchema } = require("../validation/paymentValidation");

const validationSchema = (schema) => (req, res, next) => {
    if (!schema || typeof schema.validate !== 'function') {
        return res.status(500).json({ 
            success: false, 
            message: "Validatsiya sxemasi yuklanishida xato! validation/paymentValidation.js faylini tekshiring." 
        });
    }

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Kurs to'lovlaridan ishlash API
 */

/**
 * @swagger
 * /payment/paymentRegister:
 *   post:
 *     summary: O'quvchidan to'lov qabul qilish
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - amount
 *               - payment_type
 *               - collected_by
 *             properties:
 *               student_id:
 *                 type: string
 *               amount:
 *                 type: number
 *               payment_type:
 *                 type: string
 *               collected_by:
 *                 type: string
 *     responses:
 *       201:
 *         description: To'lov muvaffaqiyatli saqlandi
 *       400:
 *         description: Saqlanishda xatolik yuz berdi
 *       500:
 *         description: Ichki server xatosi
 */
payments.post("/paymentRegister", validationSchema(paymentValidationSchema), paymentRegister);

/**
 * @swagger
 * /payment/getPayment:
 *   get:
 *     summary: To'lovlar tarixini olish
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli qaytarildi
 *       400:
 *         description: Qaytarilishda xatolik yuz berdi
 *       500:
 *         description: Ichki server xatosi
 */
payments.get("/getPayment", getPayment);

module.exports = { payments };