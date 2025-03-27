import api from '../../../components/services/interceptors';
import { logout } from '../../../redux/states/authSlice';
import { store } from '../../../redux/store';


export const logoutUser = async () => {
    try {
        // Llamar al endpoint de cierre de sesión para invalidar la cookie
        await api.post('/api/auth/logout');

        // Actualizar Redux
        store.dispatch(logout());
    } catch (error) {
        console.error('Error en cierre de sesión:', error);
        // Aun si hay error, limpiar el estado local
        store.dispatch(logout());
    }
};
