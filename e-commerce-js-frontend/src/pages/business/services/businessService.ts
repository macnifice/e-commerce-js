import { AxiosError } from "axios";
import { BusinessResponse, CreateBusiness } from "../../../models/business.interface";
import api from "../../../components/services/interceptors";

export const createBusiness = async (business: CreateBusiness): Promise<BusinessResponse> => {
    try {
        const response = await api.post<CreateBusiness>('/business', business);
        return response as BusinessResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error en registro:', error.response);
            return error.response as BusinessResponse;
        } else {
            console.error('Error en registro:', error);
            return error as BusinessResponse;
        }
    }
}

export const getBusinesses = async (): Promise<BusinessResponse> => {
    try {
        const response = await api.get('/business');
        return response as BusinessResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error en registro:', error.response);
            return error.response as BusinessResponse;
        } else {
            console.error('Error en registro:', error);
            return error as BusinessResponse;
        }
    }
}


