import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  const code = err.status || err.code || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
  res.status(code).json({ success: false, message, code });
};

export default errorHandler;
