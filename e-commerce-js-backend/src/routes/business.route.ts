import { Router } from 'express';
import { authMiddleware, checkRole } from '../middlewares/auth.middleware';
import { createBusiness, getBusiness } from '../controllers/business.controller';

const router: Router = Router();

/**
 * @swagger
 * /api/v1/business:
 *   get:
 *     summary: Obtener todos los negocios
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     description: Este endpoint requiere autenticación y rol de administrador
 *     responses:
 *       200:
 *         description: Lista de negocios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del negocio
 *                   name:
 *                     type: string
 *                     description: Nombre del negocio
 *                   email:
 *                     type: string
 *                     description: Email del negocio
 *                   role:
 *                     type: string
 *                     description: Rol (siempre 'business')
 *                   isVerified:
 *                     type: boolean
 *                     description: Estado de verificación del negocio
 *       500:
 *         description: Error al obtener negocios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get('/', authMiddleware, checkRole('admin'), getBusiness);

/**
 * @swagger
 * /api/v1/business:
 *   post:
 *     summary: Crear un nuevo negocio
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     description: Este endpoint requiere autenticación y rol de administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del negocio
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del negocio
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña para el negocio
 *               role:
 *                 type: string
 *                 description: Rol del usuario (debe ser 'business')
 *                 enum:
 *                   - business
 *     responses:
 *       201:
 *         description: Negocio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del negocio creado
 *                 name:
 *                   type: string
 *                   description: Nombre del negocio
 *                 email:
 *                   type: string
 *                   description: Email del negocio
 *                 role:
 *                   type: string
 *                   description: Rol del negocio
 *                 isVerified:
 *                   type: boolean
 *                   description: Estado de verificación del negocio
 *       400:
 *         description: Datos inválidos o el negocio ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *       403:
 *         description: Acceso prohibido (rol incorrecto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error al crear negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/', authMiddleware, checkRole('admin'), createBusiness);


export { router };


