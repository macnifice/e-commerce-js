import { Product, ProductCreationAttributes, ProductUpdateAttributes } from "../interfaces/product/product.interface";
import { db } from "../models";


export const getAll = async (): Promise<Product[]> => {
    try {
        const products = await db.Product.findAll({
            include: [
                {
                    model: db.Business,
                    as: 'business',
                    attributes: ['id', 'name']
                }
            ]
        });
        return products;
    } catch (error: any) {
        throw new Error(error.message || "Error al obtener productos");
    }
}

export const getByBusinessId = async (businessId: string): Promise<Product[]> => {
    try {
        const business = await db.Business.findOne({ where: { userId: businessId } });
        if (!business) {
            throw new Error("Negocio no encontrado");
        }
        const products = await db.Product.findAll({ where: { businessId: business.id } });
        return products;
    } catch (error: any) {
        throw new Error(error.message || "Error al obtener productos");
    }
}

export const create = async (product: ProductCreationAttributes): Promise<Product> => {
    try {
        const business = await db.Business.findOne({ where: { userId: product.businessId } });
        if (!business) {
            throw new Error("Negocio no encontrado");
        }
        product.businessId = business.id;
        const newProduct = await db.Product.create(product);
        return newProduct;
    } catch (error: any) {
        throw new Error(error.message || "Error al crear producto");
    }
}

export const update = async (id: string, product: ProductUpdateAttributes): Promise<Product> => {
    try {
        await db.Product.update(product, { where: { id } });
        const updatedProduct = await db.Product.findByPk(id);
        return updatedProduct;
    } catch (error: any) {
        throw new Error(error.message || "Error al actualizar producto");
    }
}

export const remove = async (id: string): Promise<void> => {
    try {
        const existProduct = await db.Product.findByPk(id);
        if (!existProduct) {
            throw new Error("Producto no encontrado");
        }
        await db.Product.destroy({ where: { id: id } });
    } catch (error: any) {
        throw new Error(error.message || "Error al eliminar producto");
    }
}
