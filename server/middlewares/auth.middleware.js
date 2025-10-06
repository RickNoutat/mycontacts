import { verifyToken } from "../services/token.service.js";
import { StatusCodes } from "http-status-codes";

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Token manquant ou mal formé",
      code: StatusCodes.UNAUTHORIZED,
    });
  }
  try {
    const payload = verifyToken(parts[1]);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Token invalide ou expiré",
      code: StatusCodes.UNAUTHORIZED,
    });
  }
};

export default requireAuth;
