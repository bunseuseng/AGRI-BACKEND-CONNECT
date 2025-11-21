import { Router } from "express";
import * as RoleController from "../controllers/roleController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";

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
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad request / validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, authorizeAdmin, RoleController.CreateRoleController);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, authorizeAdmin, RoleController.GetRolesController);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role details
 *       400:
 *         description: Invalid role ID
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, authorizeAdmin, RoleController.GetRoleByIdController);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
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
 *                 example: Manager
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid role ID / validation error
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, authorizeAdmin, RoleController.UpdateRoleController);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       400:
 *         description: Invalid role ID
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, authorizeAdmin, RoleController.DeleteRoleController);

export default router;
