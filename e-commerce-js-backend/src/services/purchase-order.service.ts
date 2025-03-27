import { PurchaseOrder, PurchaseOrderCreationAttributes } from "../interfaces/purchase-order/purchase-order.interface";
import { db } from "../models";

export const create = async (order: PurchaseOrderCreationAttributes): Promise<PurchaseOrder> => {
    try {
        const newOrder = await db.PurchaseOrder.create(order);
        return newOrder;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getByBusinessId = async (businessId: string): Promise<PurchaseOrder[]> => {
    try {
        const orders = await db.PurchaseOrder.findAll({ where: { businessId } });
        return orders;
    }
    catch (error: any) {
        throw new Error(error);
    }
}

export const getByCustomerId = async (customerId: string): Promise<PurchaseOrder[]> => {
    try {
        const orders = await db.PurchaseOrder.findAll({ where: { customerId } });
        return orders;
    }
    catch (error: any) {
        throw new Error(error);
    }
}


export const update = async (id: string, status: string): Promise<PurchaseOrder> => {
    try {
        const order = await db.PurchaseOrder.findByPk(id);
        if (!order) {
            throw new Error("Order not found");
        }
        order.status = status;
        const updatedOrder = await db.PurchaseOrder.update({ status }, { where: { id } });
        return updatedOrder;
    }
    catch (error: any) {
        throw new Error(error);
    }
}   
