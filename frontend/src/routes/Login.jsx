
import React from 'react'
import { useState } from 'react';
function Login() {
    const [formData, setData] = useState({
        email: "",
        password: "",
        role: "Seeker"
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form data", formData)
    }
    const handleSignupClick = () => {
        alert("Redirect to signup page (you can handle this later).");
    };
    return (
        <div className="w-full p-4 relative min-h-[100vh] bg-pink1 flex items-center justify-center overflow-hidden">

            {/* 🔷 Upper left square — visible with better contrast */}
            <div className="absolute top-[20%] left-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] -translate-x-1/2 -translate-y-1/2 z-[5]" />

            {/* 🔷 Lower left square — visible with stronger opacity */}
            <div className="absolute top-[40%] left-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] -translate-x-1/2 -translate-y-1/2 z-[4]" />

            {/* 🔷 Upper right square — matched left one */}
            <div className="absolute bottom-[20%] right-0 w-[260px] h-[260px] bg-boxlight rotate-45 rounded-[16px] translate-x-1/2 translate-y-1/2 z-[5]" />

            {/* 🔷 Lower right square — matched left one */}
            <div className="absolute bottom-[40%] right-0 w-[130px] h-[130px] bg-boxdark rotate-45 rounded-[12px] translate-x-1/2 translate-y-1/2 z-[4]" />

            {/* ✅ Added z-[20] and relative to ensure it floats above all rotated squares */}
            <div className="w-full max-w-md bg-white shadow-lg rounded-sm p-8 z-20">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Welcome Back
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='mb-4'>
                        <label htmlFor="email" className="block text-darkblack1 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            required
                            className="w-full px-4 py-2 border-1 border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="Password" className="block font-normal text-darkblack1 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            required

                        />
                    </div>

                    <div className='mb-6'>
                        <label className="block text-darkblack1 mb-2">Role</label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-darkpink1 focus:outline-none cursor-pointer"
                        >
                            <option value="Seeker">Seeker</option>
                            <option value="Provider">Provider</option>
                        </select>
                    </div>

                    <div>
                        <button type='submit' className="w-full bg-darkpink1 hover:bg-darkpink2 text-white py-2 rounded-sm transition duration-200 cursor-pointer active:scale-95">
                            Log in
                        </button>
                    </div>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center flex justify-center">
                    Don’t have an account?{" "}
                    <p className="animate-bounce">
                        <a href="/Signup" className="m-1 text-red-500 font-medium hover:underline">
                            Sign up!
                        </a>
                    </p>
                </p>

            </div>
        </div>
    )
}
export default Login