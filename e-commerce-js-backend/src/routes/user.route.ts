import { Router } from "express";
import { verifyUser } from "../controllers/user.controller";


const router: Router = Router();

/**
 * @swagger
 * /api/v1/users/verify/{id}:
 *   put:
 *     summary: Verificar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a verificar
 *     responses:
 *       200:
 *         description: Usuario verificado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: Información del usuario verificado
 *       400:
 *         description: El ID es requerido
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       500:
 *         description: Error al verificar usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 */
router.put('/verify/:id', verifyUser);

export { router };


