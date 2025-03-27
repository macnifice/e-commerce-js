import api from "../../../components/services/interceptors";
import { ProductResponse } from "../../../models/product.interface";
import { AxiosError } from "axios";

export const getProducts = async () => {
    try {
        const response = await api.get("/product");
        console.log(response);
        return response as ProductResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
            return error.response as ProductResponse;
        } else {
            console.log(error);
            return error as ProductResponse;
        }
    }
}