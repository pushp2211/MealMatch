import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import OtpVerify from "./routes/Otp_verify";
import ProviderDashPage from "./routes/provider/ProviderDashPage";
import DashboardArea from "./components/ProviderComponents/DashboardArea";

import GoogleMapView from "./routes/provider/GoogleMapView";
import Post from "./components/PostFood/Post";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./context/ProtectedRoute";
import { DummyDashboard } from "./routes/DummyDashboard";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthProvider><Outlet /></AuthProvider>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpverify" element={<OtpVerify />} />

        {/* ✅ Protected Route */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/providerDashboard" element={<ProviderDashPage />}>
            <Route index element={<DashboardArea />} />
            <Route path="find-seeker" element={<GoogleMapView />} />
            <Route path="post-food" element={<Post />} />
          </Route>
          <Route path="/DummyDashboard" element={<DummyDashboard />} />
        {/* </Route> */}
      </Route>
    </>
  )
);

export default App;
