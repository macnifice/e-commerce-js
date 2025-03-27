import { sign, verify, JwtPayload, SignOptions } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Configuración del Refresh Token
const REFRESH_SECRET = process.env.REFRESH_SECRET || "REFRESH_TOKEN_SECRET";

// Interfaz para el payload del refresh token
interface RefreshTokenPayload extends JwtPayload {
    id: string;
    tokenId: string;
}

/**
 * Genera un refresh token para un usuario
 * @param userId ID del usuario
 * @returns Token JWT para refresh
 */
const generateRefreshToken = (userId: string): string => {
    try {
        // Generar un ID único para este refresh token
        const tokenId = uuidv4();

        // Construir el payload
        const payload: RefreshTokenPayload = {
            id: userId,
            tokenId
        };

        // Opciones para el token
        const signOptions: SignOptions = {
            expiresIn: '7d'
        };

        // Generar el token
        const refreshToken = sign(payload, REFRESH_SECRET, signOptions);

        return refreshToken;
    } catch (error) {
        console.error("Error al generar refresh token:", error);
        throw new Error("Error al generar refresh token");
    }
}

/**
 * Verifica y decodifica un refresh token
 * @param token Refresh token a verificar
 * @returns Payload decodificado
 * @throws Error si el token es inválido
 */
const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    if (!token) {
        throw new Error("Refresh token no proporcionado");
    }

    try {
        const decoded = verify(token, REFRESH_SECRET) as RefreshTokenPayload;
        return decoded;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new Error("El refresh token ha expirado");
        } else if (error.name === "JsonWebTokenError") {
            throw new Error("Refresh token inválido");
        } else {
            console.error("Error al verificar refresh token:", error);
            throw new Error("Error al verificar refresh token");
        }
    }
}

export {
    generateRefreshToken,
    verifyRefreshToken,
    RefreshTokenPayload
}; 