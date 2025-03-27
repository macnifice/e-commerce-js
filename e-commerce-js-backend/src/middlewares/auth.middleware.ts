import { Request, Response, NextFunction } from "express";
import { TokenPayload, verifyToken } from "../utils/jwt.handle";

/**
 * Middleware para verificar la autenticación del usuario
 * @param req Request de Express
 * @param res Response de Express
 * @param next Función NextFunction de Express
 */
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Obtener el token de autenticación
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({
                message: "Acceso denegado"
            });
            return;
        }

        try {
            // Extraer y verificar el token
            const tokenData: TokenPayload = verifyToken(token);

            if (!tokenData) {
                res.status(401).json({
                    message: "Token inválido o expirado"
                });
                return;
            }

            next();
        } catch (error: any) {
            res.status(401).json({
                message: error.message || "Token inválido o expirado"
            });
            return;
        }
    } catch (error) {
        console.error("Error en middleware de autenticación:", error);
        res.status(500).json({
            message: "Error en la autenticación"
        });
        return;
    }
};

/**
 * Middleware para verificar si el usuario tiene el rol requerido
 * @param requiredRole Rol requerido para acceder a la ruta
 */
export const checkRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({
                message: "Acceso denegado"
            });
            return;
        }

        const tokenData: TokenPayload = verifyToken(token);

        if (!tokenData) {
            res.status(401).json({
                message: "Token inválido o expirado"
            });
            return;
        }

        if (tokenData.role !== requiredRole) {
            res.status(403).json({
                message: "No tienes permisos para acceder a este recurso"
            });
            return;
        }

        next();
    };
}; 