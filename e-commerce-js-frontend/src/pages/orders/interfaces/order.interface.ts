export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  businessId: string;
  businessName: string;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface OrderResponse {
  success: boolean;
  message: string;
  status: number;
  data?: Order[] | Order;
} 