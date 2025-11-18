import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./config/swagger";
import roleRoutes from "./routes/roleRoute";



const app = express();
// Enable CORS and JSON parsing middleware if needed
app.use(cors());

// Must parse JSON before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(logger);
// ✅ Add Swagger before routes
setupSwagger(app);

//Test route
app.get("/", (req, res) => {
  res.send("AgriConnect API is running");
});
// Routes
app.use("/api/auth", authRoutes);

// Role routes
app.use("/api/roles", roleRoutes);

// Global error handler
app.use(errorHandler);

export default app;
