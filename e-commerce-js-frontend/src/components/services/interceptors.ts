import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { store } from '../../redux/store';
import { logout } from '../../redux/states/authSlice';

// Crear instancia de axios con la URL base
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Variable para controlar si estamos refrescando el token
let isRefreshing = false;

// Cola de solicitudes pendientes
interface QueueItem {
    resolve: (value: unknown) => void;
    reject: (error: AxiosError) => void;
}

let failedQueue: QueueItem[] = [];

// Procesar cola de solicitudes pendientes
const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(undefined);
        }
    });

    failedQueue = [];
};

// Función para refrescar el token
const refreshToken = async () => {
    try {
        // Llamamos al endpoint de refresh - no necesitamos enviar el token
        // ya que está en la cookie HTTP-only y se enviará automáticamente
        await axios.post(import.meta.env.VITE_API_URL + '/auth/refresh', {
            withCredentials: true
        });
        return true;
    } catch (error) {
        // Si falla el refresh, desconectamos al usuario
        store.dispatch(logout());
        throw error;
    }
};

// No necesitamos interceptor para agregar tokens en las solicitudes
// ya que las cookies se envían automáticamente

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Si es error 401 (No autorizado) y no hemos intentado refrescar
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Si ya estamos refrescando, ponemos la solicitud en cola
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        // No necesitamos modificar headers ya que las cookies se envían automáticamente
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            // Marcamos que estamos refrescando
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Intentamos refrescar el token
                await refreshToken();
                // Procesamos la cola con éxito
                processQueue(null);
                // Reintentamos la solicitud original
                return api(originalRequest);
            } catch (refreshError) {
                // Si falla el refresh, procesamos la cola con error
                console.log(refreshError);
                processQueue(refreshError as AxiosError);
                // Redirigir al login
                store.dispatch(logout());
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Para otros errores, simplemente los rechazamos
        return Promise.reject(error);
    }
);

export default api; 