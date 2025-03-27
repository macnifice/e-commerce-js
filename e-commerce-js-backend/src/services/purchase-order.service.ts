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
                purchaseOrderId: newOrder.id
            }),
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
                    attributes: ['id', 'statusId', 'userId'],
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
        const orders = await db.PurchaseOrder.findAll({ where: { userId: customerId } });
        return orders;
    }
    catch (error: any) {
        throw new Error(error);
    }
}


export const update = async (id: string, status: number): Promise<PurchaseOrder> => {
    try {
        const order = await db.PurchaseOrder.findByPk(id);
        if (!order) {
            throw new Error("Order not found");
        }
        const updatedOrder = await db.PurchaseOrder.update({ statusId: status }, { where: { id } });

        const products = await db.OrderItem.findAll({ where: { purchaseOrderId: id } });

        console.log({ status });

        if (status !== 3) {
            console.log('decrementing stock');
            await Promise.all(products.map((product: OrderItem) =>
                db.Product.decrement('stock', {
                    by: product.quantity,
                    where: { id: product.productId }
                })
            ));
        } else {
            console.log('incrementing stock');
            await Promise.all(products.map((product: OrderItem) =>
                db.Product.increment('stock', {
                    by: product.quantity,
                    where: { id: product.productId }
                })
            ));
        }
        return updatedOrder;
    }
    catch (error: any) {
        throw new Error(error);
    }
}   
