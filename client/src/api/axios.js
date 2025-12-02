import axios from 'axios';

// Public API (for landing page - no authentication)
export const publicAPI = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin API (for admin panel - with authentication)
export const adminAPI = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to admin requests
adminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
adminAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ==== Product API calls ====
export const createProduct = (data) => adminAPI.post('/admin/products', data);
export const updateProduct = (id, data) => adminAPI.put(`/admin/products/${id}`, data);
export const deleteProduct = (id) => adminAPI.delete(`/admin/products/${id}`);
export const getAllProducts = () => adminAPI.get('/admin/products');
export const getProductById = (id) => adminAPI.get(`/admin/products/${id}`);
export const getProductsByCategory = (category) => adminAPI.get(`/admin/products/category/${category}`);

// ==== Bundle API calls ====
export const createBundle = (data) => adminAPI.post('/admin/bundles', data);
export const updateBundle = (id, data) => adminAPI.put(`/admin/bundles/${id}`, data);
export const deleteBundle = (id) => adminAPI.delete(`/admin/bundles/${id}`);
export const getAllBundles = () => adminAPI.get('/admin/bundles');
export const getBundleById = (id) => adminAPI.get(`/admin/bundles/${id}`);
export const getBundlesByCategory = (category) => adminAPI.get(`/admin/bundles/category/${category}`);

// Export default adminAPI for backward compatibility
export default adminAPI;
