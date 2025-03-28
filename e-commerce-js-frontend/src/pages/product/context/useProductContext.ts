import { useContext } from "react";
import { ProductContext, ProductContextType } from "./productContextType";

export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('context invalido');
    }
    return context;
}; 