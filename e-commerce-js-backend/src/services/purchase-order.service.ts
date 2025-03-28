import { OrderItem, PurchaseOrder, PurchaseOrderCreationAttributes } from "../interfaces/purchase-order/purchase-order.interface";
import { db } from "../models";

export const create = async (order: PurchaseOrderCreationAttributes): Promise<PurchaseOrder> => {
    try {
        const { products, ...orderData } = order;
        const newOrder = await db.PurchaseOrder.create(orderData);

        await Promise.all(products.map((product) =>
            db.OrderItem.create({
                productId: product.id,
                price: product.price,
                quantity: product.quantity,
                businessId: product.businessId,
                purchaseOrderId: newOrder.id,
                statusId: product.statusId
            }),
        ));

        await Promise.all(products.map((product) =>
            adjustProductStock(product.id, product.quantity, "decrement")
        ));

        return newOrder;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getByBusinessId = async (businessId: string): Promise<OrderItem[]> => {
    try {

        const business = await db.Business.findOne({ where: { userId: businessId } });

        const orders = await db.OrderItem.findAll({
            where: { businessId: business.id },
            include: [
                {
                    model: db.PurchaseOrder,
                    as: 'purchaseOrder',
                    attributes: ['id', 'userId'],
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['name', 'email']
                        }
                    ]
                },
                {
                    model: db.Product,
                    as: 'product',
                    attributes: ['name']
                }
            ]
        });
        return orders;
    }
    catch (error: any) {
        throw new Error(error);
    }
}

export const getByCustomerId = async (customerId: string): Promise<PurchaseOrder[]> => {
    try {
        const orders = await db.PurchaseOrder.findAll({
            where: { userId: customerId }, include: [
                {
                    model: db.OrderItem,
                    as: 'items',
                    attributes: ['id', 'quantity', 'price', 'statusId', 'purchaseOrderId', 'createdAt'],
                    include: [
                        {
                            model: db.Product,
                            as: 'product',
                            attributes: ['name'],
                            include: [
                                {
                                    model: db.Business,
                                    as: 'business',
                                    attributes: ['name']
                                }
                            ]
                        },
                    ],
                },

            ]
        });

        const formattedItems = orders.flatMap((order: any) =>
            order.items.map((item: any) => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.product?.name,
                total: item.price * item.quantity,
                businessName: item.product?.business?.name,
                purchaseOrderId: item.purchaseOrderId,
                statusId: item.statusId,
                createdAt: item.createdAt
            }))
        );

        return formattedItems;
    }
    catch (error: any) {
        throw new Error(error);
    }
}


export const update = async (id: string, status: number): Promise<PurchaseOrder> => {
    try {
        const updatedOrder = await db.OrderItem.update({ statusId: status }, { where: { id } });

        if (!updatedOrder) {
            throw new Error("Item not found");
        }
        const item = await db.OrderItem.findByPk(id);

        if (status === 2) {
            await adjustProductStock(item.productId, item.quantity, "decrement");
        } else if (status === 3 || status === 4) {
            await adjustProductStock(item.productId, item.quantity, "increment");
        }

        return updatedOrder;
    }
    catch (error: any) {
        throw new Error(error);
    }
}

const adjustProductStock = async (
    productId: number,
    quantity: number,
    type: "increment" | "decrement"
): Promise<void> => {
    try {
        const product = await db.Product.findOne({ where: { id: productId } });

        if (!product) {
            throw new Error("Product not found");
        }

        if (type === "decrement") {
            
            if (product.stock === 0) {
                return;
            }

            if (product.stock < quantity) {
                throw new Error("Insufficient stock");
            }

            await db.Product.decrement("stock", {
                by: quantity,
                where: { id: productId },
            });
        } else {
            await db.Product.increment("stock", {
                by: quantity,
                where: { id: productId },
            });
        }
    } catch (error: any) {
        throw new Error(error);
    }
};
