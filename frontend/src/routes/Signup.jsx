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
    <div className="w-full min-h-[100vh] p-8 relative bg-pink1 flex items-center justify-center overflow-hidden">
      {/* 🔷 Upper left square — visible with better contrast */}
      <div className="absolute top-[20%] left-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] -translate-x-1/2 -translate-y-1/2 z-[5]" />

      {/* 🔷 Lower left square — visible with stronger opacity */}
      <div className="absolute top-[40%] left-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] -translate-x-1/2 -translate-y-1/2 z-[4]" />

      {/* 🔷 Upper right square — matched left one */}
      <div className="absolute bottom-[20%] right-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] translate-x-1/2 translate-y-1/2 z-[5]" />

      {/* 🔷 Lower right square — matched left one */}
      <div className="absolute bottom-[40%] right-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] translate-x-1/2 translate-y-1/2 z-[4]" />

      {/* ✅ Added z-[20] and relative to ensure it floats above all rotated squares */}
      {/* Signup Card */}
      <div className="w-full max-w-md min-w-[40%] bg-white shadow-lg rounded-sm p-8 relative z-[20]">
        <h1 className="text-xl lg:text-2xl font-semibold text-center text-darkblack1 mb-6">
          Get Started
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='mb-4'>
            <label htmlFor="name" className="block text-darkblack1 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={SignupData.name}
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-darkpink1"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className="block text-darkblack1 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={SignupData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-darkpink1"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="Mobile Number" className="block text-darkblack1 mb-2">
              Mobile Number
            </label>
            <input
              id="Mobile Number"
              type="tel"
              name="Mobile Number"
              value={SignupData.name}
              placeholder="Enter your mobile number"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-darkpink1"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className="block text-darkblack1 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={SignupData.password}
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-darkpink1 focus:outline-none"
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor=" confirmpassword" className="block text-darkblack1 mb-2">
              Confirm Password
            </label>
            <input
              id="confirm password"
              type="password"
              name="confirm_password"
              value={SignupData.confirm_password}
              placeholder="Confirm password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-darkpink1 focus:outline-none"
              required
            />
          </div>

          <div className='mb-6'>
            <label className="block text-darkblack1 mb-2">Role</label>
            <select
              name="role"
              value={SignupData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-darkpink1 focus:outline-none cursor-pointer"
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
            className="w-full bg-darkpink1 hover:bg-darkpink2 text-white py-2 rounded-sm transition duration-200 cursor-pointer active:scale-95"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 gap-x-1 mt-6 text-center flex justify-center">
          Already have an account?{" "}
          <p className="">
            <a href="/login" className="m-1 text-red-500 font-medium underline">
              Log in
            </a>
          </p>
        </p>
      </div>
    </div>
  );
}

export default Signup;
