export interface CreatePurchaseOrder {
    total: number;
    iva: number;
    subtotal: number;
    userId: number;
    statusId: number;
    products: OrderItem[];

}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    businessId: number;
}

