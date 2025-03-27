import api from "../../../components/services/interceptors";
import { AxiosError } from "axios";
import { CustomerOrderResponse } from "../../../models/orders.interface";
export const getOrdersByCustomerId = async (customerId: string) => {
  try {
    const response = await api.get(`/purchase-order/customer/${customerId}`);
    console.log("response", response);
    return response as CustomerOrderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching customer orders:", error.response);
      return error.response as CustomerOrderResponse;
    } else {
      console.error("Unexpected error:", error);
      return error as CustomerOrderResponse;
    }
  }
};

export const updateOrderStatus = async (orderId: string, status: number) => {
  try {
    const response = await api.put(`/purchase-order/status/${orderId}`, { status });
    console.log("response", response);
    return response as CustomerOrderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating order status:", error.response);
      return error.response as CustomerOrderResponse;
    } else {
      console.error("Unexpected error:", error);
      return error as CustomerOrderResponse;
    }
  }
};