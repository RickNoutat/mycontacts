import { StatusCodes } from "http-status-codes";

const sourceMap = {
  body: "body",
  params: "params",
  query: "query",
};

const validate =
  (schema, from = "body") =>
  (req, res, next) => {
    const key = sourceMap[from] || "body";
    const { error, value } = schema.validate(req[key], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Validation error",
        code: StatusCodes.BAD_REQUEST,
        details: error.details.map((d) => ({
          message: d.message,
          path: d.path,
        })),
      });
    }
    req[key] = value;
    return next();
  };

export default validate;
