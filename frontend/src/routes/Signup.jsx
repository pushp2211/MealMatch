import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (loading) return;

    if (signupData.password !== signupData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/auth/signup/send-otp`,
        {
          name: signupData.name,
          email: signupData.email,
          phone: signupData.phone,
          password: signupData.password,
        }
      );

      alert("OTP sent to your email");
      // navigating to otp page and also sending email
      navigate("/otpverify", {
        state: { email: signupData.email },
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full min-h-[100vh] p-8 relative bg-pink1 flex items-center justify-center overflow-hidden">
      <div className="absolute top-[20%] left-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] -translate-x-1/2 -translate-y-1/2 z-[5]" />
      <div className="absolute top-[40%] left-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] -translate-x-1/2 -translate-y-1/2 z-[4]" />
      <div className="absolute bottom-[20%] right-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] translate-x-1/2 translate-y-1/2 z-[5]" />
      <div className="absolute bottom-[40%] right-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] translate-x-1/2 translate-y-1/2 z-[4]" />

      <div className="w-full max-w-md min-w-[40%] bg-white shadow-lg rounded-sm p-8 relative z-[20]">
        <h1 className="text-xl lg:text-2xl font-semibold text-center text-darkblack1 mb-6">
          Get Started
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='mb-4'>
            <label htmlFor="name" className="block text-darkblack1 mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={signupData.name}
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-darkpink1"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className="block text-darkblack1 mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={signupData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-darkpink1"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="mobile_number" className="block text-darkblack1 mb-2">Mobile Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={signupData.phone}
              placeholder="Enter your mobile number"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-darkpink1"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className="block text-darkblack1 mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={signupData.password}
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-darkpink1 focus:outline-none"
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="confirm_password" className="block text-darkblack1 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              placeholder="Confirm password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-darkpink1 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-sm transition duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-darkpink1 hover:bg-darkpink2 text-white active:scale-95 cursor-pointer"
              }
            `}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 gap-x-1 mt-6 flex justify-center items-center">
          Already have an account?{" "}
          <a href="/login" className="m-1 text-red-500 font-medium underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;