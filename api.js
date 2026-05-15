import axios from 'axios'

const api = axios.create({
  // Point to the live Render backend if in production, otherwise use relative path
  // This ensures Vercel deployment can communicate with the Render backend
  baseURL: import.meta.env.PROD
    ? 'https://cookreceipe-4.onrender.com/api' 
    : '/api',
  withCredentials: true,
})

// Add a request interceptor to handle tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api
