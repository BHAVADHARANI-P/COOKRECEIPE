import axios from 'axios'

const api = axios.create({
  // Hardcoding the Render backend to ensure Vercel can always find it
  baseURL: 'https://cookreceipe-4.onrender.com/api',
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
