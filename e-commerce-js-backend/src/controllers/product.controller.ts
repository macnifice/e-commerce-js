import { Request, Response } from "express";
import { create, getAll, getByBusinessId, remove, update } from "../services/product.service";



export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await getAll();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).send(error.message || "Error al obtener productos");
    }
}

// export const getProductById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const product = await getById(id);
//         res.status(200).json(product);
//     } catch (error: any) {
//         res.status(500).send(error.message || "Error al obtener producto");
//     }
// }

export const getProductsByBusinessId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send("ID de negocio requerido");
            return;
        }
        const products = await getByBusinessId(id);
        console.log(products);
        res.status(200).send(products);
    } catch (error: any) {
        res.status(500).send(error.message || "Error al obtener productos");
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, stock, image, businessId } = req.body;

        if (!name || !image || !price || !stock || !businessId) {
            res.status(400).send("Campos requeridos incompletos");
            return;
        }

        const product = await create(
            {
                name,
                description,
                price,
                stock,
                image,
                businessId
            }
        );

        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).send(error.message || "Error al crear producto");
        return;
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, image, businessId } = req.body;

        if (!id) {
            res.status(400).send("ID de producto requerido");
            return;
        }

        const product = await update(id, { name, description, price, stock, image });
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).send(error.message || "Error al actualizar producto");
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send("ID de producto requerido");
            return;
        }
        await remove(id);
        res.status(200).send("Producto eliminado correctamente");
    } catch (error: any) {
        res.status(500).send(error.message || "Error al eliminar producto");
    }
}