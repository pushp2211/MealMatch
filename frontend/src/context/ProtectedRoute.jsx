import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const ProtectedRoute = ({ allowedRole }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) return null; // block render completely

//   if (!user) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (allowedRole && user.role !== allowedRole) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
