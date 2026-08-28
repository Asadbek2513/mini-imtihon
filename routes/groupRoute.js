const { Router } = require("express");
const groups = Router();

const {
    GroupRegister,
    getGroups,
    updateGroup,
    deletGroup
} = require("../controller/group.controller");

const {
    groupValidationSchema,
    updateGroupValidationSchema
} = require("../validation/groupValidation");

const validationSchema = (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details.message);
    next();
};

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Guruhlar boshqaruvi uchun API ma'lumotlari
 */

/**
 * @swagger
 * /group/GroupRegister:
 *   post:
 *     summary: O'quv guruhi yaratish
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               group_name:
 *                 type: string
 *               lesson_start_time:
 *                 type: string
 *               lesson_end_time:
 *                 type: string
 *               lesson_days:
 *                 type: string
 *               room_number:
 *                 type: string
 *               branch:
 *                 type: string
 *               teacher_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Guruh muvaffaqiyatli ochildi
 *       400:
 *         description: Guruh ochilishda xatolik yuz berdi
 *       500:
 *         description: Ichki server xatosi
 */
groups.post("/GroupRegister", validationSchema(groupValidationSchema), GroupRegister);

/**
 * @swagger
 * /group/getGroups:
 *   get:
 *     summary: Guruhlar ro'yxatini ko'rish
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       400:
 *         description: Ro'yxat qaytarilishda xatolik yuz berdi
 *       500:
 *         description: Ichki server xatosi 
 */
groups.get("/getGroups", getGroups);

/**
 * @swagger
 * /group/updateGroup/{id}:
 *   put:
 *     summary: Guruh ma'lumotlarini yangilash
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Guruh yangilandi
 *       400:
 *         description: Guruh yangilanmadi
 *       500:
 *         description: Ichki server xatosi
 */
groups.put("/updateGroup/:id", validationSchema(updateGroupValidationSchema), updateGroup);

/**
 * @swagger
 * /group/deletGroup/{id}:
 *   delete:
 *     summary: Guruhni o'chirish
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Guruh o'chirildi
 *       400:
 *         description: Guruh o'chirilmadi
 *       500:
 *         description: Ichki sever xatosi
 */
groups.delete("/deletGroup/:id", deletGroup);

module.exports = { groups };