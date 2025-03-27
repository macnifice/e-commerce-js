import axios, { AxiosError } from "axios";
import { Register } from "../../../models/user.interface";

export const register = async (formData: Register) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error en registro:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('Error en registro:', error);
            return error;
        }
    }
};  
