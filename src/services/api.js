// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cabindia-token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cabindia-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Add a test function to verify API connection
export const testApiConnection = async () => {
  try {
    const response = await api.get('/api/test');
    console.log('API Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Test failed:', error);
    throw error;
  }
};

export default api;