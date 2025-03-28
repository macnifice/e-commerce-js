export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    businessId: number;
}

export interface CreateOrEditProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    businessId: number;
}

export interface ProductResponse {
    status: number;
    data: {
        message?: string;
        product?: Product;
    };
}

