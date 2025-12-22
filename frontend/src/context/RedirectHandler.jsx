import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RedirectHandler = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect authenticated users away from public pages
    if (!loading && user) {
      // Public pages that should redirect to dashboard if logged in
      const publicPages = ['/', '/login', '/signup', '/otpverify'];
      
      if (publicPages.includes(location.pathname)) {
        if (user.role === "provider") {
          navigate("/providerDashboard", { replace: true });
        } else {
          navigate("/DummyDashboard", { replace: true });
        }
      }
    }
  }, [user, loading, navigate, location.pathname]);

  return children;
};

export default RedirectHandler;