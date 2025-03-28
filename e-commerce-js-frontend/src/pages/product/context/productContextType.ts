import { createContext } from "react";
import { Product } from "../../../models/product.interface";

export interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
    updateProductContext: (product: Product) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)
