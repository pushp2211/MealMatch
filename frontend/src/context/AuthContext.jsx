import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

const AuthContext = createContext();

// BroadcastChannel for cross-tab communication
const authChannel =
  typeof window !== "undefined"
    ? new BroadcastChannel("auth_channel")
    : null;

export const AuthProvider = ({ children }) => {
  // undefined = loading, null = logged out, object = logged in
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // Wrapper to sync across tabs
  const setUserWithSync = (userData) => {
    setUser(userData);
    if (authChannel) {
      authChannel.postMessage({ type: "AUTH_CHANGE", user: userData });
    }
  };

  /* FIX: Handle browser back-forward cache (bfcache) */
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page restored from bfcache → auth memory is unsafe
        setUser(null);
        setLoading(false);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  /* Existing auth check */
  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await api.get("/api/auth/getme");
        if (mounted) {
          setUser(res.data.user);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    // Listen for auth changes from other tabs
    const handleMessage = (event) => {
      if (event.data.type === "AUTH_CHANGE") {
        setUser(event.data.user);
      }
    };

    if (authChannel) {
      authChannel.addEventListener("message", handleMessage);
    }

    return () => {
      mounted = false;
      if (authChannel) {
        authChannel.removeEventListener("message", handleMessage);
      }
    };
  }, []);


  // Adding logout and logout all logics here itself so that they can be passed to multiple files easily
  // Logout (current session logout only)
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clear user in all tabs
      setUserWithSync(null);
    }
  };

  // logout all (out of all devices)
  const logoutAll = async () => {
    try {
      await api.post("/api/auth/logout-all");
    } catch (err) {
      console.error("Logout all error:", err);
    } finally {
      // Clear user in all tabs
      setUserWithSync(null);
    }
  };
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      setUser: setUserWithSync,
      logout,
      logoutAll,
    }}>
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
