import { Request, Response } from "express";
import { create, getByBusinessId, getByCustomerId, update } from "../services/purchase-order.service";


export const getOrdersByBusinessId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const orders = await getByBusinessId(id);
        res.status(200).send(orders);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}

export const getOrderByCustomerId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await getByCustomerId(id);
        res.status(200).json(order);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await create(req.body);
        res.status(201).send(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}


export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await update(id, status);
        res.status(200).json(order);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
}

