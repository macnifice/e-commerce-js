export interface CreatePurchaseOrder {
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
    businessId: number;
    statusId: number;
}

export interface CartResponse {
    status: number;
    data: object;
}

