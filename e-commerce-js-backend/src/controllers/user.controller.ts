import { Request, Response } from "express";
import { verify } from "../services/user.service";


export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send("El id es requerido");
            return;
        }
        const user = await verify(id);

        if (!user) {
            res.status(404).send("Usuario no encontrado");
            return;
        }
        res.status(200).send(user);
    } catch (error: any) {
        res.status(500).send(error.message || "Error al verificar usuario");
        return;
    }
}









