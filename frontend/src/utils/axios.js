import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(p =>
    error ? p.reject(error) : p.resolve()
  );
  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // FIX: Add better condition checking
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh") &&
      !originalRequest.url.includes("/api/auth/login") &&
      !originalRequest.url.includes("/api/auth/signup")
    ) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/api/auth/refresh");
        processQueue();
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        
        // Clear cookies
        document.cookie = 'accessToken=; Max-Age=0; path=/;';
        document.cookie = 'refreshToken=; Max-Age=0; path=/;';
        
        // Only redirect if on PROTECTED pages
        const publicPages = ['/', '/login', '/signup', '/otpverify'];
        const currentPath = window.location.pathname;
        
        if (!publicPages.includes(currentPath) && !publicPages.some(page => currentPath.startsWith(page))) {
          window.location.href = "/login";
        }
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;