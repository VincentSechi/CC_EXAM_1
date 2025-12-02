// src/services/api.js
import axios from 'axios';

// Default to hosted backend so production works even without env vars.
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://exam-backend-2oi1.onrender.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const fetchProducts = () => apiClient.get('/products');

export const createOrder = (orderData) => apiClient.post('/orders', orderData);
