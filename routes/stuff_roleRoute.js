const { Router } = require("express");
const stuffRoleRoute = Router();
const {
    poststuff_role,
    getStuff_role,
    getStuff_roleById,
    updateStuff_role,
    deleteStuff_role
} = require("../controller/stuff_role.controller");

const {
    stuffRoleValidation
} = require("../validation/stuff_roleValidation");

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
 *   name: Staff Roles
 *   description: Xodimlarga rollarni biriktirish
 */

/**
 * @swagger
 * /stuff-role/poststuff_role:
 *   post:
 *     summary: Xodimga rol biriktirish
 *     tags: [Staff Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             properties:
 *               stuff_id:
 *                 type: String
 *               role_id:
 *                 type: String
 *     responses:
 *       201:
 *         description: Rol biriktirildi
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoleRoute.post("/poststuff_role", validationSchema(stuffRoleValidation), poststuff_role);

/**
 * @swagger
 * /stuff-role/getStuff_role:
 *   get:
 *     summary: Barcha xodimlarning rollari bog'lanishlarini olish
 *     tags: [Staff Roles]
 *     responses:
 *       200:
 *         description: Ro'yxat qaytarildi
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoleRoute.get("getStuff_role", getStuff_role);

/**
 * @swagger
 * /stuff-role/getStuff_roleById/{id}:
 *   get:
 *     summary: ID bo'yicha biriktirilgan rolni ko'rish
 *     tags: [Staff Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Topildi
 *       400:
 *         description: Topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoleRoute.get("/getStuff_roleById/:id", getStuff_roleById);

/**
 * @swagger
 * /stuff-role/updateStuff_role/{id}:
 *   put:
 *     summary: Biriktirilgan rolni o'zgartirish
 *     tags: [Staff Roles]
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
 *             type: Subject
 *             properties:
 *               stuff_id:
 *                 type: String
 *               role_id:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Yangilanmadi
 *       500: 
 *         description: Ichki server xatosi
 */
stuffRoleRoute.put("/updateStuff_role/:id", validationSchema(stuffRoleValidation), updateStuff_role);

/**
 * @swagger
 * /stuff-role/deleteStuff_role/{id}:
 *   delete:
 *     summary: Biriktirilgan rolni o'chirish
 *     tags: [Staff Roles]
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
stuffRoleRoute.delete("/deleteStuff_role/:id", deleteStuff_role);

module.exports = { stuffRoleRoute };