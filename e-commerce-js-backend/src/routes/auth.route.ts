import { Router } from "express";
import { register, login, refresh, logout } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *               password:
 *                 type: string 
 *                 format: password
 *                 description: Contraseña del usuario
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               role:
 *                 type: string
 *                 description: Rol del usuario
 *                 enum:
 *                   - customer
 *                   - business
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al registrar usuario
 */
router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refrescar token de acceso
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refrescado exitosamente
 *       401:
 *         description: Token de refresco inválido
 *       500:
 *         description: Error al refrescar token
 */
router.post('/refresh', refresh);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al cerrar sesión
 */
router.post('/logout', authMiddleware, logout);

export { router };


