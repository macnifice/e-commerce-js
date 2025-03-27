import { AxiosError } from "axios";
import api from "../../../components/services/interceptors";
import { CreatePurchaseOrder } from "../../../models/cart.interface";


export const createPurchaseOrder = async (purchaseOrder: CreatePurchaseOrder) => {
    try {
        const response = await api.post(`/purchase-order`, purchaseOrder);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error al crear la orden de compra:", error.response);
            throw error.response;

        } else {
            console.error("Error al crear la orden de compra:", error);
            throw error;
        }
    }
}



