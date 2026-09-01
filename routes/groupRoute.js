const { Router } = require("express");
const groupRoute = Router();
const {
    GroupRegister,
    getGroups,
    getGroupById,
    updateGroup,
    deletGroup
} = require("../controller/group.controller");

const {
    groupValidation
} = require("../validation/groupValidation");

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
 *   name: Groups
 *   description: O'quv guruhlarini boshqarish
 */

/**
 * @swagger
 * /group/GroupRegister:
 *   post:
 *     summary: Yangi guruh yaratish
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
 *                 type: String
 *               lesson_start_time:
 *                 type: String
 *               lesson_continuous:
 *                 type: String
 *               lesson_week_day:
 *                 type: String
 *               group_stage_id:
 *                 type: String
 *               room_number:
 *                 type: String
 *               room_floor:
 *                 type: Number
 *               branch_id:
 *                 type: String
 *               lessons_quant:
 *                 type: Number
 *               is_active:
 *                 type: Boolean
 *     responses:
 *       200:
 *         description: Yangi guruh yaratildi
 *       500: 
 *         description: Ichki server xatosi
 */
groupRoute.post("/GroupRegister", validationSchema(groupValidation), GroupRegister);

/**
 * @swagger
 * /group/getGroups:
 *   get:
 *     summary: Barcha guruhlarni olish
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Guruhlar ro'yxati
 *       500: 
 *         description: Ichki server xatosi
 */
groupRoute.get("/getGroups", getGroups);

/**
 * @swagger
 * /group/getGroupById/{id}:
 *   get:
 *     summary: ID bo'yicha guruhni olish
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Guruh topildi
 *       404:
 *         description: Bunday guruh topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
groupRoute.get("/getGroupById/:id", getGroupById);

/**
 * @swagger
 * /group/updateGroup/{id}:
 *   put:
 *     summary: Guruh ma'lumotlarini o'zgartirish
 *     tags: [Groups]
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
 *               group_name:
 *                 type: String
 *               lesson_start_time:
 *                 type: String
 *               lesson_continuous:
 *                 type: String
 *               lesson_week_day:
 *                 type: String
 *               group_stage_id:
 *                 type: String
 *               room_number:
 *                 type: String
 *               room_floor:
 *                 type: Number
 *               branch_id:
 *                 type: String
 *               lessons_quant:
 *                 type: Number
 *               is_active:
 *                 type: Boolean
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Guruh yangilanmadi
 *       500: 
 *         description: Ichki server xatosi
 */
groupRoute.put("/updateGroup/:id", validationSchema(groupValidation), updateGroup);

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
 *           type: String
 *     responses:
 *       200:
 *         description: O'chirildi
 */
groupRoute.delete("/deletGroup/:id", deletGroup);

module.exports = { groupRoute };