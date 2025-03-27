import { createProduct, deleteProduct, getProducts, getProductsByBusinessId, updateProduct } from "../controllers/product.controller";
import { Router } from "express";
import { authMiddleware, checkRole, multipleRoles } from "../middlewares/auth.middleware";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                   description:
 *                     type: string
 *                     description: Descripción del producto
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad en stock
 *                   image:
 *                     type: string
 *                     description: URL de la imagen del producto
 *                   businessId:
 *                     type: string
 *                     description: ID del negocio al que pertenece
 *                   business:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID del negocio
 *                       name:
 *                         type: string
 *                         description: Nombre del negocio
 *       500:
 *         description: Error al obtener productos
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/v1/product/business/{id}:
 *   get:
 *     summary: Obtener productos por ID de negocio
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Este endpoint requiere autenticación y rol de negocio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Lista de productos del negocio obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                   description:
 *                     type: string
 *                     description: Descripción del producto
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad en stock
 *                   image:
 *                     type: string
 *                     description: URL de la imagen del producto
 *                   businessId:
 *                     type: string
 *                     description: ID del negocio al que pertenece
 *       400:
 *         description: ID de negocio no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       403:
 *         description: Prohibido - rol incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       500:
 *         description: Error al obtener productos
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 */
router.get('/business/:id', authMiddleware, multipleRoles(['business', 'admin']), getProductsByBusinessId);

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Este endpoint requiere autenticación y rol de negocio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - image
 *               - businessId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               stock:
 *                 type: integer
 *                 description: Cantidad en stock
 *               image:
 *                 type: string
 *                 description: URL de la imagen del producto
 *               businessId:
 *                 type: string
 *                 description: ID del negocio al que pertenece
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del producto creado
 *                 name:
 *                   type: string
 *                   description: Nombre del producto
 *                 description:
 *                   type: string
 *                   description: Descripción del producto
 *                 price:
 *                   type: number
 *                   description: Precio del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en stock
 *                 image:
 *                   type: string
 *                   description: URL de la imagen del producto
 *                 businessId:
 *                   type: string
 *                   description: ID del negocio al que pertenece
 *       400:
 *         description: Campos requeridos incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       403:
 *         description: Prohibido - rol incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       500:
 *         description: Error al crear producto
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 */
router.post('/', authMiddleware, multipleRoles(['business', 'admin']), createProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Este endpoint requiere autenticación y rol de negocio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               stock:
 *                 type: integer
 *                 description: Cantidad en stock
 *               image:
 *                 type: string
 *                 description: URL de la imagen del producto
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del producto
 *                 name:
 *                   type: string
 *                   description: Nombre del producto
 *                 description:
 *                   type: string
 *                   description: Descripción del producto
 *                 price:
 *                   type: number
 *                   description: Precio del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en stock
 *                 image:
 *                   type: string
 *                   description: URL de la imagen del producto
 *                 businessId:
 *                   type: string
 *                   description: ID del negocio al que pertenece
 *       400:
 *         description: ID de producto no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       403:
 *         description: Prohibido - rol incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       500:
 *         description: Error al actualizar producto
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 */
router.put('/:id', authMiddleware, multipleRoles(['business', 'admin']), updateProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Este endpoint requiere autenticación y rol de negocio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de éxito
 *       400:
 *         description: ID de producto no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       403:
 *         description: Prohibido - rol incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 *       500:
 *         description: Error al eliminar producto
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error
 */
router.delete('/:id', authMiddleware, multipleRoles(['business', 'admin']), deleteProduct);

export { router };
