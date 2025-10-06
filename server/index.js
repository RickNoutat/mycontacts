import connectDB from "./config/db.js";
import app from "./app.js";

const port = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `🚀 API ready on http://localhost:${port} | Swagger: /api-docs`
      );
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
