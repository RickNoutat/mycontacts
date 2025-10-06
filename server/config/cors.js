const parseOrigins = (env) =>
  (env || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const allowed = new Set([
  "http://localhost:5173",
  "http://localhost:3000",
  ...parseOrigins(process.env.CORS_ORIGIN),
]);

const corsOptions = {
  origin(origin, cb) {
    // Swagger, Postman, curl: pas d'Origin -> autoriser
    if (!origin) return cb(null, true);
    if (allowed.has(origin)) return cb(null, true);
    cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

export default corsOptions;
