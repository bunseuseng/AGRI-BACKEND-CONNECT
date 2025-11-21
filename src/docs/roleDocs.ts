// /**
//  * @swagger
//  * tags:
//  *   name: Roles
//  *   description: Role management (Admin only)
//  */

// /**
//  * @swagger
//  * /api/roles:
//  *   post:
//  *     summary: Create a new role
//  *     tags: [Roles]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: Admin
//  *               description:
//  *                 type: string
//  *                 example: Has full access
//  *     responses:
//  *       201:
//  *         description: Role created successfully
//  *       400:
//  *         description: Validation error
//  *       403:
//  *         description: Forbidden (Admin only)
//  */

// /**
//  * @swagger
//  * /api/roles:
//  *   get:
//  *     summary: Get all roles
//  *     tags: [Roles]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */

// /**
//  * @swagger
//  * /api/roles/{id}:
//  *   get:
//  *     summary: Get role by ID
//  *     tags: [Roles]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Success
//  *       404:
//  *         description: Role not found
//  */

// /**
//  * @swagger
//  * /api/roles/{id}:
//  *   put:
//  *     summary: Update role
//  *     tags: [Roles]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Updated successfully
//  *       403:
//  *         description: Admin only
//  */

// /**
//  * @swagger
//  * /api/roles/{id}:
//  *   delete:
//  *     summary: Delete role
//  *     tags: [Roles]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *     responses:
//  *       200:
//  *         description: Role deleted
//  *       403:
//  *         description: Admin only
//  */
