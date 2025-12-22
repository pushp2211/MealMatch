import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./context/ProtectedRoute";
import RedirectHandler from "./context/RedirectHandler";

import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import OtpVerify from "./routes/Otp_verify";

import ProviderDashPage from "./routes/provider/ProviderDashPage";
import DashboardArea from "./components/ProviderComponents/DashboardArea";

import GoogleMapView from "./routes/provider/GoogleMapView";
import Post from "./components/PostFood/Post";

import { DummyDashboard } from "./routes/DummyDashboard";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthProvider><Outlet /></AuthProvider>}>
      {/* Public Routes */}
        <Route path="/" element={
          <RedirectHandler>
            <HomePage />
          </RedirectHandler>
        } />
        
        <Route path="/login" element={
          <RedirectHandler>
            <Login />
          </RedirectHandler>
        } />

        <Route path="/signup" element={
          <RedirectHandler>
            <Signup />
          </RedirectHandler>
        } />
        <Route path="/otpverify" element={
          <RedirectHandler>
            <OtpVerify />
          </RedirectHandler>
        } />

        {/* Protected Route */}
        <Route element={<ProtectedRoute allowedRole="provider" />}>
          <Route path="/providerDashboard" element={<ProviderDashPage />}>
            <Route index element={<DashboardArea />} />
            <Route path="find-seeker" element={<GoogleMapView />} />
            <Route path="post-food" element={<Post />} />
          </Route>

          <Route path="/DummyDashboard" element={<DummyDashboard />} />
        </Route>
      </Route>
    </>
  )
);

export default App;
