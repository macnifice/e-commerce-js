import api from "../../../components/services/interceptors";
import { OrderResponse } from "../interfaces/order.interface";
import { AxiosError } from "axios";

export const getOrdersByBusinessId = async (businessId: string) => {
  try {
    const response = await api.get(`/orders/business/${businessId}`);
    return response.data as OrderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching orders:", error.response);
      return error.response?.data as OrderResponse;
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "Error inesperado al obtener órdenes",
        status: 500,
      } as OrderResponse;
    }
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data as OrderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating order status:", error.response);
      return error.response?.data as OrderResponse;
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "Error inesperado al actualizar estado de la orden",
        status: 500,
      } as OrderResponse;
    }
  }
};

export const getOrderDetails = async (orderId: string) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data as OrderResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching order details:", error.response);
      return error.response?.data as OrderResponse;
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "Error inesperado al obtener detalles de la orden",
        status: 500,
      } as OrderResponse;
    }
  }
}; 