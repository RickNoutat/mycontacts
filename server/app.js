import "dotenv/config.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import corsOptions from "./config/cors.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import apiRouter from "./routes/index.js";
import notFound from "./middlewares/notfound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Sécurité & parsing
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Limiteur basique pour /auth (anti bruteforce)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/auth", authLimiter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes API
app.use("/api", apiRouter);

// 404 & erreurs
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5001;
connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(
        `🚀 API ready on http://localhost:${port} | Swagger: /api-docs`
      )
    );
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });

export default app;
