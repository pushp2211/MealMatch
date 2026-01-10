// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error = null) => {
//   failedQueue.forEach(p =>
//     error ? p.reject(error) : p.resolve()
//   );
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   res => res,
//   async error => {
//     const originalRequest = error.config;

//     // FIX: Add better condition checking
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/api/auth/refresh") &&
//       !originalRequest.url.includes("/api/auth/login") &&
//       !originalRequest.url.includes("/api/auth/signup")
//     ) {
//       // If already refreshing, queue this request
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => api(originalRequest))
//           .catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await api.post("/api/auth/refresh");
//         processQueue();
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err);
        
//         // Only redirect if on PROTECTED pages
//         const publicPages = ['/', '/login', '/signup', '/otpverify'];
//         const currentPath = window.location.pathname;
        
//         if (!publicPages.includes(currentPath) && !publicPages.some(page => currentPath.startsWith(page))) {
//           window.location.replace("/login");
//         }
        
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// NEW: Channel for cross-tab communication
const channel = new BroadcastChannel("auth_channel");

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
      
      // If already refreshing (in THIS tab or ANY OTHER tab), queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      // Notify other tabs: "I am refreshing, you guys wait"
      channel.postMessage("REFRESH_START");

      try {
        await api.post("/api/auth/refresh");
        
        // Notify other tabs: "Done! Proceed"
        channel.postMessage("REFRESH_DONE");
        processQueue();
        
        return api(originalRequest);
      } catch (err) {
        // Notify other tabs: "I failed, stop waiting"
        channel.postMessage("REFRESH_DONE");
        processQueue(err);
        
        // Only redirect if NOT on public pages (Your original logic)
        const publicPages = ['/', '/login', '/signup', '/otpverify'];
        const currentPath = window.location.pathname;
        
        if (!publicPages.includes(currentPath) && !publicPages.some(page => currentPath.startsWith(page))) {
          window.location.replace("/login");
        }
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// NEW: Listen to other tabs
channel.onmessage = (event) => {
  if (event.data === "REFRESH_START") {
    isRefreshing = true; // Lock this tab too
  } else if (event.data === "REFRESH_DONE") {
    isRefreshing = false; // Unlock
    processQueue(); // Process any requests that queued up while waiting
  }
};

export default api;