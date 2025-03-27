import { AxiosError } from "axios";
import api from "../../../components/services/interceptors";
import { CreateProduct, ProductResponse } from "../../../models/product.interface";


export const getProductByBusinessId = async (businessId: number) => {
    try {
        const response = await api.get(`/product/business/${businessId}`);
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

export const createProduct = async (product: CreateProduct) => {
    try {
        const response = await api.post("/product", product);
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


export const updateProduct = async (id: string, product: CreateProduct) => {
    try {
        const response = await api.put(`/product/${id}`, product);
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


export const deleteProduct = async (id: string) => {
    try {
        const response = await api.delete(`/product/${id}`);
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

