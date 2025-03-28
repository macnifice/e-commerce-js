import api from '../../../components/services/interceptors';
import { logout } from '../../../redux/states/authSlice';
import { store } from '../../../redux/store';


export const logoutUser = async () => {
    try {
        await api.post('/api/auth/logout');

        store.dispatch(logout());
    } catch (error) {
        console.error('Error en cierre de sesión:', error);
        store.dispatch(logout());
    }
};
