import { Op } from "sequelize";
import { BusinessCreationAttributes, Business } from "../interfaces/business/business.interface";
import { db } from "../models";
import { encrypt } from "../utils/bcrypt.handle";

const getAll = async (): Promise<Business[]> => {
    try {
        const businesses = await db.User.findAll({ where: { role: 'business' } });
        return businesses;
    } catch (error: any) {
        console.error("Error al obtener negocios:", error);
        throw new Error(error.message || "Error al obtener negocios");
    }
}

const getById = async (id: number): Promise<Business> => {
    try {
        const business = await db.User.findByPk(id, { where: { role: 'business' } });
        if (!business) {
            throw new Error("Negocio no encontrado");
        }
        return business;
    } catch (error: any) {
        console.error("Error al obtener negocio:", error);
        throw new Error(error.message || "Error al obtener negocio");
    }
}

const create = async (businessData: BusinessCreationAttributes): Promise<Business | null> => {
    try {
        const { name, email, role } = businessData;

        if (role === 'business') {
            const business = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { name: name }
                    ]
                }
            });

            if (business) {
                return null;
            }
        }

        businessData.password = await encrypt(businessData.password);

        const newBusiness = await db.User.create(businessData);
        console.log(newBusiness);
        if (newBusiness) {
            await db.Business.create({
                userId: newBusiness.id,
                name: newBusiness.name
            });
        }

        return newBusiness;
    }
    catch (error: any) {
        console.error("Error al crear negocio:", error);
        throw new Error(error.message || "Error al crear negocio");
    }

}

const update = async (id: number, businessData: BusinessCreationAttributes): Promise<Business> => {
    try {
        await getById(id);
        const updatedBusiness = await db.Business.update(businessData, { where: { id: id } });
        return updatedBusiness;
    } catch (error: any) {
        console.error("Error al actualizar negocio:", error);
        throw new Error(error.message || "Error al actualizar negocio");
    }
}

const remove = async (id: number): Promise<void> => {
    try {
        await getById(id);
        await db.Business.destroy({ where: { id: id } });
    } catch (error: any) {
        console.error("Error al eliminar negocio:", error);
        throw new Error(error.message || "Error al eliminar negocio");
    }
}

export {
    create,
    getAll,
    getById,
    update,
    remove
};

