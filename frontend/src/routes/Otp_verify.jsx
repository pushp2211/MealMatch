import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("pendingSignup"));

  useEffect(() => {
    if (!user) {
      alert("No user data found. Redirecting to signup.");
      navigate("/signup");
    }
  }, [navigate, user]);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    if (onlyDigits.length <= 6) setOtp(onlyDigits);
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:8005/send-otp", { email: user.email });
      alert("OTP resent.");
      setTimeLeft(60);
      setCanResend(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to resend OTP.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      return alert("Please enter a valid OTP.");
    }

    try {
      const res = await axios.post("http://localhost:8005/signup", {
        ...user,
        otp
      });

      if (res.data.success) {
        localStorage.removeItem("pendingSignup");
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(res.data.error || "OTP verification failed");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Server error during signup.");
    }
  };

  return (
    <div className="p-4 w-full min-h-screen flex items-center justify-center bg-[#fadcd9]">
      <form onSubmit={handleVerify} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">OTP Verification</h2>

        <input
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          autoFocus
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-1 focus:ring-darkpink1"
        />

        <button
          type="submit"
          className="w-full bg-darkpink1 hover:bg-darkpink2 text-white py-2 rounded transition duration-200 mb-3"
        >
          Verify OTP
        </button>

        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-500 underline text-sm"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-sm text-gray-600 text-center">Resend in {timeLeft}s</p>
        )}
      </form>
    </div>
  );
}

export default OtpVerify;
