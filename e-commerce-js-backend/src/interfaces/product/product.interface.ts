export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    businessId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductCreationAttributes {
    name: string;
    description?: string;
    price: number;
    stock: number;
    image: string;
    businessId: number;
}

export interface ProductUpdateAttributes {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    image?: string;
}