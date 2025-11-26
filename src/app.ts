import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./config/swagger";
import roleRoutes from "./routes/roleRoute";
import UserRoute from "./routes/userRoutes";
import UserRoleRoute from "./routes/userRoleRoute";
import productRoutes from "./routes/productRoute";



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

// User routes
app.use("/api/users", UserRoute);

// Role routes
app.use("/api/roles", roleRoutes);

// User-Role routes
app.use("/api/user-roles", UserRoleRoute);

// Product routes
app.use("/api/products", productRoutes);
// Global error handler
app.use(errorHandler);

export default app;
