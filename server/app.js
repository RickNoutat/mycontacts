import "dotenv/config.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";

import corsOptions from "./config/cors.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import apiRouter from "./routes/index.js";
import notFound from "./middlewares/notfound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();
const isDev = process.env.NODE_ENV === "development";

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
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
    customSiteTitle: "MyContacts API",
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Routes API
app.use("/api", apiRouter);

// 404 & erreurs
app.use(notFound);
app.use(errorHandler);

export default app;
