import api from "../../../components/services/interceptors";
import { CustomerOrderResponse } from "../../../models/orders.interface";
import { AxiosError } from "axios";

export const getOrdersByBusinessId = async (businessId: string) => {
  try {
    const response = await api.get(`/purchase-order/business/${businessId}`);
    return response as CustomerOrderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching orders:", error.response);
      throw error.response as CustomerOrderResponse;
    } else {
      throw error as CustomerOrderResponse;
    }
  }
};

export const updateOrderStatus = async (orderId: string, status: number) => {
  try {
    const response = await api.put(`/purchase-order/status/${orderId}`, { status });
    return response as CustomerOrderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating order status:", error.response);
      throw error.response as CustomerOrderResponse;
    } else {
      throw error as CustomerOrderResponse;
    }
  }
};