// src/services/adminApi.js
import { apiClient } from "./api";

export const getOrders = () => apiClient.get("/orders");

export const getProducts = () => apiClient.get("/products");

export const updateOrderStatus = (orderId, status) =>
  apiClient.put(`/orders/${orderId}/status`, { status });

export const validateOrder = (orderId) =>
  apiClient.put(`/orders/${orderId}/validate`, {});

export const updateProductStock = (productId, stock) =>
  apiClient.put(`/products/${productId}/stock`, { stock });
