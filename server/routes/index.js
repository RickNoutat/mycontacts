import { Router } from "express";
import authRoutes from "./auth.route.js";
import contactRoutes from "./contact.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/contacts", contactRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
