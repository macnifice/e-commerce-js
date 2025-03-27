export enum OrderStatus {
    POR_PAGAR = "Por pagar",
    PAGADA = "Pagada",
    DEVUELTA = "Devuelta",
    CANCELADA = "Cancelada"
}

export interface OrderProduct {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    subtotal: number;
}

export interface PurchaseOrder {
    id: string;
    negocioId: string;
    usuarioId: string;
    estatus: OrderStatus;
    total: number;
    subtotal: number;
    iva: number;
    productos: OrderProduct[];
    createdAt: Date;
    updatedAt: Date;
}

export interface PurchaseOrderCreationAttributes {
    negocioId: string;
    usuarioId: string;
    productos: OrderProduct[];
}
