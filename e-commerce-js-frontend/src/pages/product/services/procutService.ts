import { AxiosError } from "axios";
import api from "../../../components/services/interceptors";
import { CreateOrEditProduct, ProductResponse } from "../../../models/product.interface";


export const getProductByBusinessId = async (businessId: number) => {
    try {
        const response = await api.get(`/product/business/${businessId}`);
        return response as ProductResponse;
    } catch (error) {
        if (error instanceof AxiosError) {

            throw error.response as ProductResponse;
        } else {
            return error as ProductResponse;
        }
    }
}

export const createProduct = async (product: CreateOrEditProduct) => {
    try {
        const response = await api.post("/product", product);
        return response as ProductResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error.response as ProductResponse;
        } else {
            throw error as ProductResponse;
        }
    }
}


export const updateProduct = async (id: number, product: CreateOrEditProduct) => {
    try {
        const response = await api.put(`/product/${id}`, product);
        return response as ProductResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error.response as ProductResponse;
        } else {
            throw error as ProductResponse;
        }
    }
}


export const deleteProduct = async (id: number) => {
    try {
        const response = await api.delete(`/product/${id}`);
        return response as ProductResponse;
    } catch (error) {
        if (error instanceof AxiosError) {    
            throw error.response as ProductResponse;
        } else {
            throw error as ProductResponse;
        }
    }
}

