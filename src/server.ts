import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { dot } from 'node:test/reporters';


dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/agri-connect')
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
// Middleware
app.use(bodyParser.json());

// Database connection