import { Router } from "express";
import * as RoleController from "../controllers/roleController";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *               description:
 *                 type: string
 *                 example: Administrator role
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad request
 */
router.post("/",authMiddleware, authorizeAdmin, RoleController.createRole);      // Create

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get("/", authMiddleware, RoleController.getAllRoles);      // Read all

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role found
 *       404:
 *         description: Role not found
 */
router.get("/:id", authMiddleware, RoleController.getRoleById);   // Read by ID

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: SuperAdmin
 *               description:
 *                 type: string
 *                 example: Super admin role
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/:id",authMiddleware, authorizeAdmin, RoleController.updateRole);    // Update

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete("/:id", authMiddleware, authorizeAdmin, RoleController.deleteRole); // Delete

export default router;
