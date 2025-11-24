import { Router } from "express";
import * as UserRoleController from "../controllers/userRoleController";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: UserRoles
 *   description: UserRole management endpoints
 */

/**
 * @swagger
 * /api/user-roles:
 *   post:
 *     summary: Assign a role to a user
 *     tags: [UserRoles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109ca
 *               roleId:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       201:
 *         description: Role assigned to user successfully
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, authorizeAdmin, UserRoleController.CreateRoleController);

/**
 * @swagger
 * /api/user-roles:
 *   get:
 *     summary: Get all user roles
 *     tags: [UserRoles]
 *     responses:
 *       200:
 *         description: List of user roles
 */
router.get("/", authMiddleware, authorizeAdmin, UserRoleController.GetRolesController);


/**
 * @swagger
 * /api/user-roles/{id}:
 *   get:
 *     summary: Get a user role by ID
 *     tags: [UserRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user role ID
 *     responses:
 *       200:
 *         description: User role data
 *       404:
 *         description: User role not found
 */
router.get("/:id", authMiddleware, authorizeAdmin, UserRoleController.GetRoleByIdController);

/**
 * @swagger
 * /api/user-roles/{id}:
 *   put:
 *     summary: Update a user role by ID
 *     tags: [UserRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109ca
 *               roleId:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/:id", authMiddleware, authorizeAdmin, UserRoleController.UpdateRoleController);

/**
 * @swagger
 * /api/user-roles/{id}:
 *   delete:
 *     summary: Delete a user role by ID
 *     tags: [UserRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user role ID
 *     responses:
 *       200:
 *         description: User role deleted successfully
 *       404:
 *         description: User role not found
 */
router.delete("/:id", authMiddleware, authorizeAdmin, UserRoleController.DeleteRoleController);

export default router;
