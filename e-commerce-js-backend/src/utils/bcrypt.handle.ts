import { hash, compare } from "bcryptjs";

/**
 * Constante para el número de rondas de salt (factor de trabajo)
 * Un valor mayor hace el hash más seguro pero más lento
 */
const SALT_ROUNDS = 10;

/**
 * Encripta una contraseña con bcrypt
 * @param password Contraseña en texto plano a encriptar
 * @param saltRounds Opcional: Factor de trabajo para bcrypt
 * @returns Contraseña hasheada
 * @throws Error si la contraseña es inválida
 */
const encrypt = async (password: string, saltRounds: number = SALT_ROUNDS): Promise<string> => {
    if (!password) {
        throw new Error("La contraseña no puede estar vacía");
    }
    
    try {
        const passwordHash = await hash(password, saltRounds);
        return passwordHash;
    } catch (error) {
        console.error("Error al encriptar contraseña:", error);
        throw new Error("Error al encriptar contraseña");
    }
}

/**
 * Verifica si una contraseña coincide con su hash
 * @param password Contraseña en texto plano a verificar
 * @param hashedPassword Hash almacenado para comparar
 * @returns Boolean indicando si la contraseña es correcta
 * @throws Error si algún parámetro es inválido
 */
const verified = async (password: string, hashedPassword: string): Promise<boolean> => {
    if (!password || !hashedPassword) {
        throw new Error("Contraseña o hash inválidos");
    }
    
    try {
        const isCorrect = await compare(password, hashedPassword);
        return isCorrect;
    } catch (error) {
        console.error("Error al verificar contraseña:", error);
        throw new Error("Error al verificar contraseña");
    }
}

export { encrypt, verified }