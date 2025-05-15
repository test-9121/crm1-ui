
import axios from 'axios';
import { toast } from 'sonner';

// Create an Axios instance with default config
export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect on 401 from 2FA endpoints
      const is2FAEndpoint = 
        error.config.url?.includes('/verify-2fa') || 
        error.config.url?.includes('/auth/login');
        
      // if (!is2FAEndpoint) {
      //   // Clear token and user data on unauthorized (except during login/2FA)
      //   localStorage.removeItem('accessToken');
      //   localStorage.removeItem('user');
        
      //   // Redirect to login page
      //   window.location.href = '/login';
      //   toast.error('Session expired. Please login again.');
      // }
    } else if (error.response) {
      // Handle other error responses
      const message = error.response.data?.message || 'An error occurred';
      console.log(message);
    } else if (error.request) {
      // Handle network errors
      toast.error('Network error. Please check your connection.');
    } else {
      // Handle other errors
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);
