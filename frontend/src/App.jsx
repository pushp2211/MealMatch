import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./context/ProtectedRoute";
import RedirectHandler from "./context/RedirectHandler";

// Auth and common page
import HomePage from "./pages/public/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OTPPage from "./pages/auth/OTP";

// Layouts
import SeekerLayout from "./layouts/SeekerLayout";
import ProviderLayout from "./layouts/ProviderLayout";

// Provider pages
import PostFood from "./pages/provider/PostFood/PostFood";
import FindSeeker from "./pages/provider/FindSeeker/FindSeeker";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import ProviderDashboard from "./pages/provider/Dashboard/ProviderDashboard";
import History from "./pages/provider/History/History";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthProvider><Outlet /></AuthProvider>}>
      {/* Public Routes */}
        <Route path="/" element={<RedirectHandler><HomePage/></RedirectHandler>} />
        <Route path="/login" element={<RedirectHandler><Login/></RedirectHandler>} />
        <Route path="/signup" element={<RedirectHandler><Signup/></RedirectHandler>} />
        <Route path="/otpverify" element={<RedirectHandler><OTPPage/></RedirectHandler>} />

        {/* Protected Provider only Routes */}
        <Route element={<ProtectedRoute allowedRole="provider" />}>
          <Route path="/providerDashboard" element={<ProviderLayout/>}>
            <Route index element={<ProviderDashboard />} />
            <Route path="post-food" element={<PostFood />} />
            <Route path="find-seeker" element={<FindSeeker />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        
        {/* Protected Seeker only routes */}
        <Route element={<ProtectedRoute allowedRole="seeker"/>}> 
          <Route path="/DummyDashboard" element={<SeekerLayout />}>
          </Route>
        </Route>

      </Route>
    </>
  )
);

export default App;
