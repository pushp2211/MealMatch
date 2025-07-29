import React, { useState, useEffect } from 'react';

function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

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
    const onlyDigits = e.target.value.replace(/[^0-9]/g, ""); // ✅ Regex filter
    if (onlyDigits.length <= 6) {
      setOtp(onlyDigits);
    }
  };
  const handleResend = (e) => {
    e.preventDefault();
    setTimeLeft(60);
    setCanResend(false);
    alert('OTP is sent again');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    alert(`OTP Verifying: ${otp}`);
  };

  return (
    <div className="p-4 relative w-[100vw] min-h-screen bg-[#fadcd9] flex items-center justify-center overflow-hidden">

      {/* Background rotated squares (same as signup) */}
      <div className="absolute top-[20%] left-0 w-[260px] h-[260px] bg-[#f8afa6] rotate-45 rounded-[16px] -translate-x-1/2 -translate-y-1/2 z-[5]" />
      <div className="absolute top-[40%] left-0 w-[130px] h-[130px] bg-[#f79489] rotate-45 rounded-[12px] -translate-x-1/2 -translate-y-1/2 z-[4]" />
      <div className="absolute bottom-[20%] right-0 w-[260px] h-[260px] bg-[#f8afa6] rotate-45 rounded-[16px] translate-x-1/2 translate-y-1/2 z-[5]" />
      <div className="absolute bottom-[40%] right-0 w-[130px] h-[130px] bg-[#f79489] rotate-45 rounded-[12px] translate-x-1/2 translate-y-1/2 z-[4]" />

      {/* OTP Form Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 relative z-[20]">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Verify OTP</h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm text-gray-600 mb-1">
              Enter OTP
            </label>
            <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-lg tracking-widest"
          />
          </div>

          <button
            type="submit"
            className="w-full bg-[#e17b6a] text-white py-2 rounded-lg hover:bg-[#d86e5d] transition duration-200"
          >
            Verify OTP
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {timeLeft > 0 ? (
            <p>
              Resend OTP in <span className="font-bold">{timeLeft}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`text-[#e17b6a] hover:underline ${
                !canResend ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
