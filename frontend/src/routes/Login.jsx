import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // FIX: Get setUser from context

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "seeker",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const deviceId = localStorage.getItem("deviceId");

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "x-device-id": deviceId,
          },
        }
      );

      // FIX: Update AuthContext with user data
      setUser(res.data.user);

      // Navigate based on role
      if (res.data.user.role === "provider") {
        navigate("/providerDashboard", { replace: true });
      } else {
        navigate("/DummyDashboard", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 relative min-h-[100vh] bg-pink1 flex items-center justify-center overflow-hidden">
      {/* Decorative squares */}
      <div className="absolute top-[20%] left-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] -translate-x-1/2 -translate-y-1/2 z-[5]" />
      <div className="absolute top-[40%] left-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] -translate-x-1/2 -translate-y-1/2 z-[4]" />
      <div className="absolute bottom-[20%] right-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] translate-x-1/2 translate-y-1/2 z-[5]" />
      <div className="absolute bottom-[40%] right-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] translate-x-1/2 translate-y-1/2 z-[4]" />

      <div className="w-full max-w-md bg-white shadow-lg rounded-sm p-8 z-20">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='mb-4'>
            <label htmlFor="email" className="block text-darkblack1 mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className="block font-normal text-darkblack1 mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
            />
          </div>

          <div className='mb-6'>
            <label className="block text-darkblack1 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-darkpink1 focus:outline-none cursor-pointer disabled:opacity-50"
            >
              <option value="seeker">Seeker</option>
              <option value="provider">Provider</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className="w-full bg-darkpink1 hover:bg-darkpink2 text-white py-2 rounded-sm transition duration-200 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center flex justify-center">
          Don't have an account?{" "}
          <p className="animate-bounce">
            <a href="/signup" className="m-1 text-red-500 font-medium hover:underline">
              Sign up!
            </a>
          </p>
        </p>
      </div>
    </div>
  );
}

export default Login;