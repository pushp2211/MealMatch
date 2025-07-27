
import React from 'react'
import { useState } from 'react';
function Login() {
    const [formData,setData]=useState({
        email:"",
        password:"",
        role:"Seeker"
    });
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData((prev)=>({...prev,[name]:value}));
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("form data",formData)
    }
    const handleSignupClick = () => {
        alert("Redirect to signup page (you can handle this later).");
    };
  return (
     <div
            className="p-4 relative min-h-screen bg-[#fadcd9] flex items-center justify-center overflow-hidden" // ✅ CHANGED overflow-hidden → overflow-visible
            
            
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
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Welcome Back</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

            
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                    Email
                    <input 
                        id="email"
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='user@exmaple.com'
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                    />
                    </label>
                </div>
                <div>
                    <label htmlFor="Password" className="block text-sm text-gray-600 mb-1">
                    Password
                    <input 
                        id="password"
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='********'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                        
                    />
                    </label>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Role</label>

                    <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="Seeker">Seeker</option>
                        <option value="Provider">Provider</option>
                    </select>
                </div>

                 <div>  
                    <button type='submit' className="w-full bg-[#e17b6a] text-white py-2 rounded-lg hover:bg-[#e17b6a] transition duration-200">
                    LOGIN
                </button>
                </div>
                </form>
               
                
            
            
                
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={handleSignupClick}
                        className="text-[#e17b6a] hover:underline"
                    >
                        Sign up
                    </button>
                </p>
            
        </div>
    </div>
  )
}
export default Login