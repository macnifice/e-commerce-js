import { Router } from "express";
import { createOrder, getOrderByCustomerId, updateOrder, getOrdersByBusinessId } from "../controllers/purchase-order.controller";

const router = Router();

/**
 * @swagger
 * /api/v1/orders/business/{id}:
 *   get:
 *     summary: Obtener órdenes por ID de negocio
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Lista de órdenes del negocio obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del ítem de orden
 *                   productId:
 *                     type: string
 *                     description: ID del producto
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                   quantity:
 *                     type: integer
 *                     description: Cantidad del producto
 *                   businessId:
 *                     type: string
 *                     description: ID del negocio
 *                   purchaseOrderId:
 *                     type: string
 *                     description: ID de la orden de compra
 *                   purchaseOrder:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID de la orden de compra
 *                       statusId:
 *                         type: integer
 *                         description: ID del estado de la orden
 *                       userId:
 *                         type: string
 *                         description: ID del usuario (cliente)
 *                       user:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Nombre del cliente
 *                           email:
 *                             type: string
 *                             description: Email del cliente
 *                   product:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nombre del producto
 *       500:
 *         description: Error al obtener órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get("/business/:id", getOrdersByBusinessId);

/**
 * @swagger
 * /api/v1/orders/customer/{id}:
 *   get:
 *     summary: Obtener órdenes por ID de cliente
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de órdenes del cliente obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la orden
 *                   userId:
 *                     type: string
 *                     description: ID del usuario (cliente)
 *                   statusId:
 *                     type: integer
 *                     description: ID del estado de la orden
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de actualización
 *       500:
 *         description: Error al obtener órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get("/customer/:id", getOrderByCustomerId);

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Crear una nueva orden de compra
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - statusId
 *               - products
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario (cliente)
 *               statusId:
 *                 type: integer
 *                 description: ID del estado de la orden
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - price
 *                     - quantity
 *                     - businessId
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del producto
 *                     price:
 *                       type: number
 *                       description: Precio del producto
 *                     quantity:
 *                       type: integer
 *                       description: Cantidad del producto
 *                     businessId:
 *                       type: string
 *                       description: ID del negocio
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la orden creada
 *                 userId:
 *                   type: string
 *                   description: ID del usuario (cliente)
 *                 statusId:
 *                   type: integer
 *                   description: ID del estado de la orden
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización
 *       500:
 *         description: Error al crear la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/v1/orders/status/{id}:
 *   put:
 *     summary: Actualizar el estado de una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: integer
 *                 description: Nuevo estado de la orden (3 para cancelación que restaura stock)
 *     responses:
 *       200:
 *         description: Estado de orden actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: Información de la orden actualizada
 *       500:
 *         description: Error al actualizar el estado de la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put("/status/:id", updateOrder);


export { router };
