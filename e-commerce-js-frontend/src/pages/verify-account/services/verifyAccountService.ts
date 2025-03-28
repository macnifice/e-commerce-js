import { AxiosError } from "axios";
import api from "../../../components/services/interceptors";

export const verifyAccount = async (id: string) => {
    try {
        const response = await api.put(`/user/verify/${id}`);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error en la verificación de cuenta:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('Error en la verificación de cuenta:', error);
            return error;
        }
    }
};

