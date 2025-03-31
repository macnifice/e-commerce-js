import { AxiosError } from "axios";
import api from "../../../components/services/interceptors";
import { CartResponse, CreatePurchaseOrder } from "../../../models/cart.interface";


export const createPurchaseOrder = async (purchaseOrder: CreatePurchaseOrder) => {
    try {
        const response = await api.post(`/purchase-order`, purchaseOrder);
        return response as CartResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response as CartResponse;

        } else {
            return error as CartResponse;
        }
    }
}



