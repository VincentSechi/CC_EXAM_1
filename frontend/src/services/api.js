// src/services/api.js
import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const fetchProducts = () => apiClient.get('/products');

export const createOrder = (orderData) => apiClient.post('/orders', orderData);
