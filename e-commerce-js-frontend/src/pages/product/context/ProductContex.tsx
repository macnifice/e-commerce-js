import React, { ReactNode, useEffect, useState } from "react";
import { Product, ProductResponse } from "../../../models/product.interface";
import { ProductContext, ProductContextType } from "./productContextType";
import { useAppSelector } from "../../../hooks/hook";
import { getProductByBusinessId } from "../services/procutService";

interface BusinessProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<BusinessProviderProps> = ({
  children,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [products, setProducts] = useState<Product[]>([]);
  //   const [confirmDialog] = useState<boolean>(false);

  //   const [closeDialog, setCloseDialog] = useState<boolean>(false);

  const fetchProduct = async () => {
    if (user) {
      getProductByBusinessId(user.id).then((response: ProductResponse) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      });
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = async (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProductContext = async (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const removeProduct = async (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const value: ProductContextType = {
    products,
    addProduct,
    updateProductContext,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
