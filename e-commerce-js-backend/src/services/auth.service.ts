import { AuthResponse, LoginRequest, RefreshTokenResponse } from "../interfaces/user/auth.interface";
import { User, UserCreationAttributes } from "../interfaces/user/user.interface";
import { db } from "../models";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { generateRefreshToken } from "../utils/refreshToken.handle";


/**
 * Servicio para el registro de nuevos usuarios
 * @param userData Datos del usuario a registrar
 * @returns Datos del usuario
 */
const registerUser = async (userData: UserCreationAttributes): Promise<User | null> => {
    try {
        // Verificar si el email ya existe
        const existingUser = await db.User.findOne({ where: { email: userData.email } });

        if (existingUser) {
            return null;
        }
        userData.password = await encrypt(userData.password);

        // Crear nuevo usuario
        const newUser = await db.User.create(userData);

        return newUser;

    } catch (error: any) {
        console.error("Error en registro de usuario:", error);
        throw new Error(error.message || "Error en el registro de usuario");
    }
};

/**
 * Servicio para autenticar usuarios existentes
 * @param email Email del usuario
 * @param password Contraseña del usuario
 * @returns Datos del usuario y tokens
 */
const loginUser = async (loginData: LoginRequest): Promise<AuthResponse | null> => {
    try {
        // Buscar usuario por email
        const user = await db.User.findOne({ where: { email: loginData.email } });

        if (!user) {
            return null;
        }

        // Verificar contraseña
        const isPasswordValid = await verified(loginData.password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        if (!user.isVerified) {
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
            return { user: userData, token: undefined, refreshToken: undefined };
        }

        // Generar tokens
        const token = generateToken(user.id, {
            role: user.role
        });

        const refreshToken = generateRefreshToken(user.id);

        // Guardar refresh token en la base de datos
        await user.update({ refreshToken });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVerified: user.isVerified
            },
            token,
            refreshToken
        };
    } catch (error: any) {
        console.error("Error en login de usuario:", error);
        throw new Error(error.message || "Error en la autenticación");
    }
};

/**
 * Servicio para refrescar un token expirado usando el refresh token
 * @param userId ID del usuario
 * @param oldRefreshToken Refresh token anterior
 * @returns Nuevos tokens
 */
const refreshUserToken = async (userId: string, oldRefreshToken: string): Promise<RefreshTokenResponse> => {
    try {
        // Buscar usuario por ID
        const user = await db.User.findByPk(userId);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Verificar que el refresh token coincida con el almacenado
        if (user.refreshToken !== oldRefreshToken) {
            throw new Error("Refresh token inválido");
        }

        // Generar nuevos tokens
        const token = generateToken(user.id, {
            role: user.role
        });

        const refreshToken = generateRefreshToken(user.id);

        // Actualizar refresh token en la base de datos
        await user.update({ refreshToken });

        return {
            token,
            refreshToken
        };
    } catch (error: any) {
        console.error("Error al refrescar token:", error);
        throw new Error(error.message || "Error al refrescar token");
    }
};

/**
 * Servicio para cerrar la sesión de un usuario
 * @param userId ID del usuario
 */
const logoutUser = async (userId: string): Promise<void> => {
    try {
        // Buscar usuario por ID
        const user = await db.User.findByPk(userId);

        if (user) {
            // Eliminar refresh token
            await user.update({ refreshToken: null });
        }
    } catch (error: any) {
        console.error("Error en logout de usuario:", error);
        throw new Error(error.message || "Error al cerrar sesión");
    }
};

export {
    registerUser,
    loginUser,
    refreshUserToken,
    logoutUser,
    AuthResponse
};

