// Product Service
import { Request, Response } from 'express';
import { Product } from '../models/productModel';
import cloudinary from '../utils/cloudinary';

// -------- CREATE PRODUCT --------
export const createProductService = async (req: Request, res: Response) => {
    try {

        // Extract product details from request body
        const { name, description, price, category, image } = req.body;
        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({
                message: "name, description, price, category, and image are required"
            });
        }
        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(image);
        // Create product
        const newProduct = await Product.create({
            name, 
            description,
            price,
            category,
            image: uploadedImage.secure_url
        })

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) return res.status(400).json({
            message: "Product with this name already exists"
        });
        // Return response if successful
        return res.status(201).json({
            message: "Product created successfully", product: newProduct
        })

    } 
    // Error handling if any
    catch (error: any) { 
        return res.status(500).json({ message: error.message });
    }
}

// -------- GET ALL PRODUCTS --------
export const getProductsService = async (req: Request, res: Response) => {
    try {
        const product = await Product.find();
        return res.status(200).json({
            products: product
        });

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
// -------- GET PRODUCT BY ID --------
export const getProductByIdService = async (req: Request, res: Response) => {
    try {
        // Extract product ID from request parameters
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Product ID is required" });

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        return res.status(200).json({ product });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

// -------- UPDATE PRODUCT --------
export const updateProductService = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

// -------- DELETE PRODUCT --------
export const deleteProductService = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};