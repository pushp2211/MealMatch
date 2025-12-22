import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

const AuthContext = createContext();

// BroadcastChannel for cross-tab communication
const authChannel = typeof window !== 'undefined' 
  ? new BroadcastChannel('auth_channel')
  : null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = loading, null = logged out, object = logged in
  const [loading, setLoading] = useState(true);

  // Wrapper to sync across tabs
  const setUserWithSync = (userData) => {
    setUser(userData);
    // Notify other tabs
    if (authChannel) {
      authChannel.postMessage({ type: 'AUTH_CHANGE', user: userData });
    }
  };

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await api.get("/api/auth/getme");
        if (mounted) {
          setUser(res.data.user);
        }
      } catch (err) {
        // Silently handle 401 - user is just not logged in
        if (mounted) {
          setUser(null);
        }
        // Don't throw or log - this is expected for non-authenticated users
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    // Listen for auth changes from other tabs
    const handleMessage = (event) => {
      if (event.data.type === 'AUTH_CHANGE') {
        setUser(event.data.user);
      }
    };

    if (authChannel) {
      authChannel.addEventListener('message', handleMessage);
    }

    return () => {
      mounted = false;
      if (authChannel) {
        authChannel.removeEventListener('message', handleMessage);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser: setUserWithSync }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};