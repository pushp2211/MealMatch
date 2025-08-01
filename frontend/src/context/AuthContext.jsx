import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = loading, false = not logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On load, verify auth from backend
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8005/getme", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
