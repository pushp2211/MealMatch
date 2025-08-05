import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ProviderDashPage from "./routes/provider/ProviderDashPage";
import DashboardArea from "./components/ProviderComponents/DashboardArea";
import GoogleMapView from "./routes/provider/GoogleMapView";
import Post from "./components/PostFood/Post";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Provider Routes */}
      <Route path="/providerDashboard" element={<ProviderDashPage />}>
        <Route index element={<DashboardArea/>} />
        <Route path="find-seeker" element={<GoogleMapView/>} />
        <Route path="post-food" element={<Post/>}/>
      </Route>
    </>
  )
);

export default App;