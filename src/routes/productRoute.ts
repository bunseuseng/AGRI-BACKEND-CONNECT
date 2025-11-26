import { Router } from "express";
import * as ProductController from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple
 *               description:
 *                 type: string
 *                 example: Fresh red apples
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 1.99
 *               category_id:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               stock:
 *                 type: number
 *                 example: 100
 *               image:
 *                 type: string
 *                 example: http://example.com/image.jpg
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request / validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, authorizeAdmin, ProductController.createProductController);
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Internal server error
 */ 

router.get("/", authMiddleware, ProductController.getProductsController);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, ProductController.getProductByIdController);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Apple
 *               description:
 *                 type: string
 *                 example: Fresh green apples
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 2.49
 *               category_id:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               stock:
 *                 type: number
 *                 example: 150
 *               image:
 *                 type: string
 *                 example: http://example.com/updated-image.jpg
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request / validation error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, authorizeAdmin, ProductController.updateProductController);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, authorizeAdmin, ProductController.deleteProductController);

export default router;