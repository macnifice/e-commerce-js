import api from "../../../components/services/interceptors";
import { ProductResponse } from "../../../models/product.interface";
import { AxiosError } from "axios";

export const getProducts = async () => {
    try {
        const response = await api.get("/product");
        return response as ProductResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response as ProductResponse;
        } else {
            return error as ProductResponse;
        }
    }
}