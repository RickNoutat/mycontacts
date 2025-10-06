import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification (Inscription, Connexion)
 *
 * /auth/register:
 *   post:
 *     summary: Inscription
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: "#/components/schemas/AuthRegisterInput" }
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/AuthResponse" }
 *       409:
 *         description: Email déjà utilisé
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ApiError" }
 *
 * /auth/login:
 *   post:
 *     summary: Connexion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: "#/components/schemas/AuthLoginInput" }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/AuthResponse" }
 *       401:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ApiError" }
 */
const router = Router();

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

export default router;
