export enum OrderStatus {
    POR_PAGAR = "Por pagar",
    PAGADA = "Pagada",
    DEVUELTA = "Devuelta",
    CANCELADA = "Cancelada"
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

export interface PurchaseOrderCreationAttributes {
    total: number;
    iva: number;
    subtotal: number;
    userId: number;
    products: OrderItem[];
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    productId: number;
    businessId: number;
    purchaseOrderId: number;
    statusId: number;
}
