// Product Controller handling thin function 
import { Request, Response } from "express";
import * as ProductService from "../services/productService";


export const createProductController = async (req: Request, res: Response) => {
    // Call the service function to create a product
    const result = await ProductService.createProductService(req, res);
    return result;
}

export const getProductsController = async (req: Request, res: Response) => {
    const result = await ProductService.getProductsService(req, res);
    return result;
}

export const getProductByIdController = async (req: Request, res: Response) => {
    const result = await ProductService.getProductByIdService(req, res);
    return result;
}

export const updateProductController = async (req: Request, res: Response) => {
    const result = await ProductService.updateProductService(req, res);
    return result;
}

export const deleteProductController = async (req: Request, res: Response) => {
    const result = await ProductService.deleteProductService(req, res);
    return result;
}


// Register might be a customer automatic
// Farmer can only create products and manage their products
// Customer can only view products
// Add create user by id for admin, make sure which admin who create the user
