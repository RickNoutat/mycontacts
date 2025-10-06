import { Router } from "express";
import requireAuth from "../middlewares/auth.middleware.js";
import * as contactCtrl from "../controllers/contact.controller.js";

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: CRUD Contacts (protégé)
 *
 * /contacts:
 *   get:
 *     summary: Lister mes contacts
 *     security: [{ bearerAuth: [] }]
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Recherche (nom/prénom/téléphone)
 *     responses:
 *       200:
 *         description: Liste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items: { $ref: "#/components/schemas/Contact" }
 *       401:
 *         description: Non autorisé
 *   post:
 *     summary: Créer un contact
 *     security: [{ bearerAuth: [] }]
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: "#/components/schemas/ContactCreateInput" }
 *     responses:
 *       201:
 *         description: Créé
 *       400:
 *         description: Validation error
 *
 * /contacts/{id}:
 *   patch:
 *     summary: Mettre à jour (partiel)
 *     security: [{ bearerAuth: [] }]
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: "#/components/schemas/ContactUpdateInput" }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Introuvable }
 *   delete:
 *     summary: Supprimer
 *     security: [{ bearerAuth: [] }]
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Supprimé }
 *       404: { description: Introuvable }
 */
const router = Router();

router.use(requireAuth);
router.get("/", contactCtrl.list);
router.post("/", contactCtrl.create);
router.patch("/:id", contactCtrl.update);
router.delete("/:id", contactCtrl.remove);

export default router;
