import { sign, verify, JwtPayload, SignOptions } from "jsonwebtoken";
import { TokenOptions, TokenPayload } from "../interfaces/user/jwt.interface";

// Configuración del JWT
const JWT_SECRET = process.env.JWT_SECRET || "TOKEN";
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";


/**
 * Genera un token JWT para un usuario
 * @param id ID del usuario
 * @param options Opciones para personalizar el token
 * @returns Token JWT
 */
const generateToken = (
    id: string,
    options?: TokenOptions
): string => {
    try {
        // Construir el payload base
        const payload: TokenPayload = { id };

        // Agregar rol si existe
        if (options?.role) {
            payload.role = options.role;
        }

        // Opciones para el token
        const signOptions: SignOptions = {
            expiresIn: '15m'
        };


        // Generar el token con las opciones
        const token = sign(payload, JWT_SECRET, signOptions);

        return token;
    } catch (error) {
        console.error("Error al generar token:", error);
        throw new Error("Error al generar token de autenticación");
    }
}

/**
 * Verifica y decodifica un token JWT
 * @param token Token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o ha expirado
 */
const verifyToken = (token: string): TokenPayload => {
    if (!token) {
        throw new Error("Token no proporcionado");
    }

    try {
        const decoded = verify(token, JWT_SECRET) as TokenPayload;
        return decoded;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new Error("El token ha expirado");
        } else if (error.name === "JsonWebTokenError") {
            throw new Error("Token inválido");
        } else {
            console.error("Error al verificar token:", error);
            throw new Error("Error al verificar token");
        }
    }
}


export {
    generateToken,
    verifyToken,
    TokenPayload,
    TokenOptions
}