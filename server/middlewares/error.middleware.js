// server/middlewares/error.middleware.js
import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  // Détecte Joi (ou Mongoose ValidationError si tu veux l’englober aussi)
  const isJoi =
    err &&
    (err.isJoi || err.name === "ValidationError") &&
    Array.isArray(err.details);

  const code = isJoi
    ? StatusCodes.BAD_REQUEST
    : err.status || err.code || StatusCodes.INTERNAL_SERVER_ERROR;

  const message = isJoi
    ? "Validation error"
    : err.message || "Internal Server Error";

  const payload = { success: false, message, code };

  if (isJoi) {
    payload.details = err.details.map((d) => ({
      message: d.message,
      path: d.path,
    }));
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  return res.status(code).json(payload);
};

export default errorHandler;
