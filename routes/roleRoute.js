const { Router } = require("express");
const roleRoute = Router();
const {
    postRole,
    getRole,
    searchRole,
    getRoleById,
    updateRole,
    deleteRole
} = require("../controller/role.controller");

const {
    roleValidation
} = require("../validation/roleValidation");

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
 *   name: Roles
 *   description: Xodimlar rollari bo'limi
 */

/**
 * @swagger
 * /role/postRole:
 *   post:
 *     summary: Yangi rol yaratish
 *     tags: [Roles]
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
 *         description: Rol qo'shildi
 *       500: 
 *         description: Ichki server xatosi
 */
roleRoute.post("/postRole", validationSchema(roleValidation), postRole);

/**
 * @swagger
 * /role/getRole:
 *   get:
 *     summary: Barcha rollarni olish
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Role qaytarildi
 *       500: 
 *         description: Ichki server xatosi
 */
roleRoute.get("/getRole", getRole);

/**
 * @swagger
 * /role/searchRole:
 *   get:
 *     summary: Rollarni nomi bo'yicha qidirish
 *     tags: [Roles]
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
roleRoute.get("/search", searchRole);

/**
 * @swagger
 * /role/getRoleById/{id}:
 *   get:
 *     summary: ID bo'yicha rolni olish
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Rol topildi
 *       400:
 *         description: Rol topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
roleRoute.get("/getRoleById/:id", getRoleById);

/**
 * @swagger
 * /role/updateRole/{id}:
 *   put:
 *     summary: Rolni yangilash
 *     tags: [Roles]
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
 *         description: Rol yangilandi
 *       400:
 *         description: Yangilanmadi
 *       500: 
 *         description: Ichki server xatosi
 */
roleRoute.put("/updateRole/:id", validationSchema(roleValidation), updateRole);

/**
 * @swagger
 * /role/deleteRole/{id}:
 *   delete:
 *     summary: Rolni o'chirish
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol o'chirildi
 *       400:
 *         description: O'chirilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
roleRoute.delete("/deleteRole/:id", deleteRole);

module.exports = { roleRoute };