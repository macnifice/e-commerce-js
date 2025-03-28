import axios, { AxiosError } from "axios";
import { Login, LoginResponse } from "../../../models/user.interface";

export const login = async (loginData: Login): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginData, { withCredentials: true });
        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response as LoginResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response as LoginResponse;
        } else {
            return error as LoginResponse;
        }

    }
};

