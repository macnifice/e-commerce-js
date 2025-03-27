import { Request, Response } from "express";
import { create, getAll } from '../services/business.service'

import { Business } from "../interfaces/business/business.interface";

export const getBusiness = async (_req: Request, res: Response): Promise<void> => {
    try {
        const business: Business[] = await getAll();
        res.status(200).send(business);
    } catch (error: any) {
        console.error("Error al obtener negocios:", error);
        res.status(500).send(error.message || "Error al obtener negocios");
        return;
    }
}

// export const getBusinessById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400).send("El id es requerido");
//             return;
//         }
//         const business = await getById(parseInt(id));
//         res.status(200).send(business);
//     } catch (error: any) {
//         console.error("Error al obtener negocio:", error);
//         res.status(500).send(error.message || "Error al obtener negocio");
//         return;
//     }
// }

export const createBusiness = async (req: Request, res: Response): Promise<void> => {

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            res.status(400).json({
                message: "El campo name, email, password y role son obligatorios"
            });
            return;
        }

        const newBusiness = await create({
            name,
            email,
            password,
            role
        });

        if (!newBusiness) {
            res.status(400).json({
                message: "El nombre o el email ya están registrados"
            });
            return;
        }

        res.status(201).send(newBusiness);
    } catch (error: any) {
        console.error("Error al crear negocio:", error);
        res.status(500).json({
            message: error.message || "Error al crear negocio"
        });
        return;
    }
}

// export const updateBusiness = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const { name, tag } = req.body;
//         if (!id) {
//             res.status(400).send("El id es requerido");
//             return;
//         }

//         if (!name) {
//             res.status(400).send("El nombre es requerido");
//             return;
//         }
//         const business = await update(parseInt(id), { name, tag });
//         res.status(200).send(business);
//     } catch (error: any) {
//         console.error("Error al actualizar negocio:", error);
//         res.status(500).send(error.message || "Error al actualizar negocio");
//         return;
//     }
// }

// export const deleteBusiness = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400).send("El id es requerido");
//             return;
//         }
//         await remove(parseInt(id));
//         res.status(200).send("Negocio eliminado exitosamente");
//     } catch (error: any) {
//         console.error("Error al eliminar negocio:", error);
//         res.status(500).send(error.message || "Error al eliminar negocio");
//         return;
//     }
// }