import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) setOtp(value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return alert("Please enter a 6-digit OTP");
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        otp,
      });

      alert("Signup successful!");
      navigate("/login", { replace: true });
    } catch (err) {
      setOtp("");
      alert(err.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/auth/signup/resend-otp`, { email });

      setTimeLeft(30);
      setOtp("");
      alert("OTP resent successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full min-h-screen flex items-center justify-center bg-[#fadcd9]">
      <form onSubmit={handleVerify} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-2 text-center">OTP Verification</h2>

        <p className="text-sm text-gray-600 mb-4 text-center">
          OTP sent to <span className="font-medium">{email}</span>
        </p>

        <input
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="Enter 6-digit OTP"
          autoFocus
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-darkpink1 hover:bg-darkpink2 cursor-pointer"
          } text-white `}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {timeLeft > 0 ? (
          <p className="text-sm text-gray-600 text-center mt-3">
            Resend OTP in {timeLeft}s
          </p>
        ) : (
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="mt-3 text-sm font-medium text-center text-red-500 underline cursor-pointer"
            >
              Resend OTP
            </button>
          </div>
          
        )}
      </form>
    </div>
  );
}

export default OtpVerify;