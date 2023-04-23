const express = require('express');
const router = express.Router();
const userControll = require('../controllers/user');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


/**
 * @openapi
 * tags:
 *   name: Library
 *   description: Library management
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Display library
 *     tags: [Library]
 *     parameters:
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Display whole library.
 *       404:
 *         description: No data to show.
 */
router.get('/api/users', userControll.allUsers);

/**
 * @openapi
 * /api/users/{userid}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return a single user.
 *       404:
 *         description: User not found.
 */
router.get('/api/users/:id', userControll.getUserById);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Add a new Author and Book
 *     tags: [Library]
 *     requestBody:
 *       description: Book object to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/api/users', userControll.addUser);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       204:
 *         description: User updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: User not found.
 */
router.put('/api/users/:id', userControll.editUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete('/api/users/:id', userControll.deleteUser);

module.exports = router;
