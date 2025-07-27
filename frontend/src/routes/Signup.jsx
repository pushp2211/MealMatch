import React, { useState } from 'react';

function Signup() {
  const [SignupData, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    mobile_number: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(SignupData);

    if (!SignupData.role) {
      alert("Please select a role.");
    } else {
      alert(`Signed up as ${SignupData.role}`);
    }
  };

  const handleLoginClick = () => {
    // You can implement redirect or page toggle here
    alert("Redirect to login page");
  };

  return (
     <div
            className=" p-4 relative w-[100vw] min-h-screen bg-[#fadcd9] flex items-center justify-center overflow-hidden" // ✅ CHANGED overflow-hidden → overflow-visible
            
            
        >

            {/* 🔷 Upper left square — visible with better contrast */}
            <div className="absolute top-[20%] left-0 w-[260px] h-[260px] bg-[#f8afa6] rotate-45 rounded-[16px] -translate-x-1/2 -translate-y-1/2 z-[5]" />

            {/* 🔷 Lower left square — visible with stronger opacity */}
            <div className="absolute top-[40%] left-0 w-[130px] h-[130px] bg-[#f79489] rotate-45 rounded-[12px] -translate-x-1/2 -translate-y-1/2 z-[4]" />

            {/* 🔷 Upper right square — matched left one */}
            <div className="absolute bottom-[20%] right-0 w-[260px] h-[260px] bg-[#f8afa6] rotate-45 rounded-[16px] translate-x-1/2 translate-y-1/2 z-[5]" />

            {/* 🔷 Lower right square — matched left one */}
            <div className="absolute bottom-[40%] right-0 w-[130px] h-[130px] bg-[#f79489] rotate-45 rounded-[12px] translate-x-1/2 translate-y-1/2 z-[4]" />

            {/* ✅ Added z-[20] and relative to ensure it floats above all rotated squares */}
      {/* Signup Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 relative z-[20]">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Get Started
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={SignupData.name}
              placeholder="John Doe"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="Mobile Number" className="block text-sm text-gray-600 mb-1">
              Mobile Number
            </label>
            <input
              id="Mobile Number"
              type="tel"
              name="Mobile Number"
              value={SignupData.name}
              placeholder="**********"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={SignupData.email}
              placeholder="john@example.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={SignupData.password}
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor=" confirmpassword" className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              id="confirm password"
              type="password"
              name="confirm_password"
              value={SignupData.confirm_password}
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Role</label>
            <select
              name="role"
              value={SignupData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Seeker">Seeker</option>
              <option value="Provider">Provider</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e17b6a] text-white py-2 rounded-lg hover:bg-[#e17b6a] transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={handleLoginClick}
            className="text-[#e17b6a] hover:underline"
          >
            Login
          </button>
        </p>
      </div>
      {/* Decorative Image */}
  
    </div>
  );
}

export default Signup;
