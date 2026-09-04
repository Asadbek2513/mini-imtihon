const { Router } = require("express");
const groupStuffRoute = Router();
const {
  postGroup_stuff,
  getGroups_stuff,
  searchGroup_stuff,
  getGroup_stuffById,
  updateGroup_stuff,
  deletGroup_stuff
} = require("../controller/group_stuff.controller");

const { 
  groupStuffValidation 
} = require("../validation/group_stuffValidation");

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
 *   name: Group Staff
 *   description: Guruh va xodimlarni bog'lash
 */

/**
 * @swagger
 * /group-stuff/postGroup_stuff:
 *   post:
 *     summary: Guruhga o'qituvchi/xodim biriktirish
 *     tags: [Group Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: Object
 *             required:
 *             properties:
 *               group_id:
 *                 type: String
 *               stuff_id:
 *                 type: String
 *     responses:
 *       200:
 *         description: O'qiyuvchi guruhga qo'shildi
 *       500:
 *         description: Ichki server xatosi
 */
groupStuffRoute.post("/postGroup_stuff", validationSchema(groupStuffValidation), postGroup_stuff);

/**
 * @swagger
 * /group-stuff/getGroups_stuff:
 *   get:
 *     summary: Guruh va xodimlar birikmalarini olish
 *     tags: [Group Staff]
 *     responses:
 *       200:
 *         description: O'quvchi ro'yxati
 *       500:
 *         description: Ichki server xatosi
 */
groupStuffRoute.get("/getGroups_stuff", getGroups_stuff);

/**
 * @swagger
 * /group-stuff/searchGroup_stuff:
 *   get:
 *     summary: Guruh-Xodim bog'lanmalarini qidirish
 *     tags: [Group Staff]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Qidiruv muvaffaqqiyatli yakunlandi
 *       500:
 *         description: Ichki server xatosi
 */
groupStuffRoute.get("/search", searchGroup_stuff);

/**
 * @swagger
 * /group-stuff/getGroup_stuffById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Group Staff]
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
groupStuffRoute.get("/getGroup_stuffById/:id", getGroup_stuffById);

/**
 * @swagger
 * /group-stuff/updateGroup_stuff/{id}:
 *   put:
 *     summary: Biriktirishni o'zgartirish
 *     tags: [Group Staff]
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
 *               group_id:
 *                 type: String
 *               stuff_id:
 *                 type: String
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Topilmadi
 *       500: 
 *         description: Ichki server xatosi
 */
groupStuffRoute.put("/updateGroup_stuff/:id", validationSchema(groupStuffValidation), updateGroup_stuff);

/**
 * @swagger
 * /group-stuff/deletGroup_stuff/{id}:
 *   delete:
 *     summary: Biriktirishni o'chirish
 *     tags: [Group Staff]
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
groupStuffRoute.delete("/deletGroup_stuff/:id", deletGroup_stuff);

module.exports = { groupStuffRoute };