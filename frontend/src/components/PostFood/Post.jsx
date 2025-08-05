import React from 'react'
import { useState } from 'react'
import AddPhoto from './AddPhoto';
import FoodDetails from './FoodDetails';
import ContactDetails from './ContactDetails';

function Post() {
    const [details,SetDetails]=useState({
        food_title:"",
        food_description:"",
        foodType:"",
        servings:"",
        quantity:"",
        phoneNumber:"",
        email:"",
        photo:"",
        pickup_location:"",
        available_until:"",
        pickup_instruction:""
    })

    const handleChange=(e)=>{

        const {name,value}=e.target;
        SetDetails((prev) => ({
        ...prev,
        [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details); // Replace with backend logic
    };
    
    return (
        <div className="w-full overflow-y-auto bg-pink1 py-10 px-4">
            <h1 className="text-3xl font-semibold text-center mb-2">Share Your Surplus Food</h1>
            <p className="text-center text-gray-600 mb-4">
                Help reduce food waste by sharing with people in your community
            </p>
        <form onSubmit={handleSubmit}>
            
        
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 space-x-4">
            {/* Left Side: Food Details, Photos, Location */}
            <div className="md:col-span-2 space-y-6">

                <FoodDetails title={details.food_title} description={details.food_description} type={details.foodType} servings={details.servings} quantity={details.quantity} handleChange={handleChange}/>

                <AddPhoto/>
            

            {/* Location & Timing */}
            <div className="bg-dashcard1 p-6 rounded-xl shadow-md space-y-4">
                <h2 className="text-lg font-semibold">📍 Location & Timing</h2>
                <input
                    name='pickup_location'
                    value={details.pickup_location}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2"
                    placeholder="Pickup Location *"
                />
                <input
                    name="available_until"
                    value={details.available_until}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2"
                    type="datetime-local"
                />
                <textarea
                    name="pickup_instruction"
                    value={details.pickup_instruction}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2"
                    rows="2"
                    placeholder="Pickup Instructions (e.g., entrance, parking)"
                ></textarea>
            </div>
            </div>

            {/* Right Side: Contact + Tips + Button */}
            <div className="space-y-6 ">
            <ContactDetails phone={details.phoneNumber} email={details.email} handleChange={handleChange}/>


            {/* Tips */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md text-sm text-blue-800 space-y-1">
                    <h3 className="font-medium">📝 Tips for Success</h3>
                    <ul className="list-disc pl-5">
                    <li>Add clear photos of your food</li>
                    <li>Be specific about quantity and servings</li>
                    <li>Mention any dietary restrictions</li>
                    <li>Provide clear pickup instructions</li>
                    <li>Respond quickly to requests</li>
                    </ul>
                </div>

                {/* Button */}
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md">
                    Share Food
                </button>
            </div>
        </div>
        </form>
    </div>

    )
}

export default Post;