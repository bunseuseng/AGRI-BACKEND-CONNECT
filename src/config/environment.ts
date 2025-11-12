import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/agri-connect';
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
export const JWT_EXPIRES_IN = '7d';
export const NODE_ENV = process.env.NODE_ENV || 'development';