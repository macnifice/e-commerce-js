import { AxiosError } from 'axios';
import api from '../../../components/services/interceptors';
import { LogoutResponse } from '../../../models/user.interface';


export const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        // store.dispatch(logout());
        console.log('Logout response:', response);
        return response as LogoutResponse
    } catch (error) {

        if (error instanceof AxiosError) {
            return error.response as LogoutResponse;

        } else {
            return error as LogoutResponse;
        }
    }
};
