
import { db } from "../models";

export const verify = async (id: string) => {
    try {
        const user = await db.User.findByPk(id);
        if (!user) return null;
        const verifiedUser = await db.User.update({ isVerified: true }, { where: { id } });
        return verifiedUser;
    } catch (error: any) {
        console.error("Error al verificar usuario:", error);
        throw new Error(error.message || "Error al verificar usuario");
    }
}






