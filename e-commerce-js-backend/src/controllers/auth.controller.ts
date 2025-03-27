import { Request, Response } from "express";
import { registerUser, loginUser, refreshUserToken, logoutUser, AuthResponse } from "../services/auth.service";
import { verifyRefreshToken } from "../utils/refreshToken.handle";
import { RefreshTokenResponse } from "../interfaces/user/auth.interface";
import { TokenPayload } from "../interfaces/user/jwt.interface";
import { verifyToken } from "../utils/jwt.handle";

/**
 * Controlador para el registro de nuevos usuarios
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, role } = req.body;

        // Validar datos de entrada
        if (!email || !password || !name || !role) {
            res.status(400).json({
                message: "Los campos email, password, name y role son obligatorios"
            });
            return;
        }

        if (!verifyEmail(email)) {
            res.status(400).json({
                message: "El email no es válido"
            });
            return;
        }

        if (password.length < 8 || password.length > 20) {
            res.status(400).json({
                message: "La contraseña debe tener entre 8 y 20 caracteres"
            });
            return;
        }

        // Registrar usuario usando el servicio
        const authData = await registerUser({
            email,
            password,
            name,
            role
        });
        // console.log(authData);

        console.log('breackpoint 1');
        if (!authData) {
            res.status(409).json({ message: "El email ya está registrado" });
            return;
        }

        const userData = { id: authData?.id, name: authData?.name, email: authData?.email, role: authData?.role, isVerified: authData?.isVerified };

        res.status(201).send(userData);
    } catch (error: any) {
        console.error("Error en controlador de registro:", error);

        if (error.message === "El email ya está registrado") {
            res.status(409).json({ message: error.message });
            return;
        }

        res.status(500).json({
            message: error.message || "Error en el registro de usuario"
        });
    }
};

/**
 * Controlador para la autenticación de usuarios
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validar datos de entrada
        if (!email || !password) {
            res.status(400).json({
                message: "Los campos email y password son obligatorios"
            });
            return;
        }

        // Autenticar usuario usando el servicio
        const authData: AuthResponse | null = await loginUser({ email, password });

        if (!authData) {
            res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            return;
        }

        // Si el usuario no está verificado, devolver esta información
        if (!authData.user.isVerified) {
            res.status(409).json({ message: "Usuario no verificado", user: authData.user });
            return;
        }


        // Setear cookies
        res.cookie("token", authData.token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "strict"
        });

        res.cookie("refreshToken", authData.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict"
        });

        res.status(200).send(authData);

    } catch (error: any) {
        console.error("Error en controlador de login:", error);

        if (error.message === "Usuario no encontrado" || error.message === "Contraseña incorrecta") {
            res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        res.status(500).json({
            message: error.message || "Error en la autenticación"
        });
        return;
    }
};

/**
 * Controlador para refrescar el token de acceso
 */
export const refresh = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(400).json({
                message: "El refresh token es obligatorio"
            });
            return;
        }

        // Verificar el refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Obtener nuevos tokens
        const tokens: RefreshTokenResponse = await refreshUserToken(decoded.id, refreshToken);

        if (!tokens) {
            res.status(401).json({
                message: "Error al refrescar el token"
            });
            return;
        }

        console.log(`new tokens ${tokens}`);

        // Eliminar cookies
        res.clearCookie("token");
        res.clearCookie("refreshToken");

        // Setear cookies
        res.cookie("token", tokens.token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "strict"
        });

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict"
        });

        res.status(200).json({
            message: "Token refrescado exitosamente",
            ...tokens
        });
    } catch (error: any) {
        console.error("Error en controlador de refresh:", error);

        if (error.message.includes("token")) {
            res.status(401).json({ message: error.message });
            return;
        }

        res.status(500).json({
            message: error.message || "Error al refrescar el token"
        });
        return;
    }
};

/**
 * Controlador para cerrar sesión
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        // Cerrar sesión
        const token = req.cookies.token;
        const refreshToken = req.cookies.refreshToken;

        if (!token) {
            res.status(401).json({
                message: "Acceso denegado"
            });
            return;
        }

        const tokenData: TokenPayload = verifyToken(token);

        if (!tokenData || !tokenData.id) {
            res.status(401).json({
                message: "Acceso denegado"
            });
            return;
        }

        await logoutUser(tokenData.id);

        // Eliminar cookies
        res.clearCookie("token");
        res.clearCookie("refreshToken");

        res.status(200).json({
            message: "Sesión cerrada exitosamente"
        });
    } catch (error: any) {
        console.error("Error en controlador de logout:", error);
        res.status(500).json({
            message: error.message || "Error al cerrar sesión"
        });
        return;
    }
};

/**
 * Verifica si un email es válido
 * @param email Email a verificar
 * @returns true si el email es válido, false en caso contrario
 */
const verifyEmail = (email: string): boolean => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

