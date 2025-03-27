export interface CustomerOrderResponse {
    status: number;
    data: object;
}

export interface PurchaseOrder {
    id: number;
    total: number;
    iva: number;
    subtotal: number;
    userId: number;
    statusId: number;
    products: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    businessId: number;
}

export enum OrderStatus {
    POR_PAGAR = 1,
    PAGADA = 2,
    DEVUELTA = 3,
    CANCELADA = 4
}

export interface OrderBusinessItemResponse {
    id: number;
    businessId: number;
    productId: number;
    price: number;
    quantity: number;
    purchaseOrderId: number;
    createdAt: string;
    updatedAt: string;
    product: {
      name: string;
    };
    purchaseOrder: {
      id: number;
      statusId: number;
      userId: number;
      user: {
        name: string;
        email: string;
      };
    };
  }
  
