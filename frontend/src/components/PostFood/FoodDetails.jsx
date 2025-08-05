import React from 'react'
import { useState } from 'react'

function FoodDetails({ title, description, type, servings, quantity, handleChange }) {
    return (
        <div className="bg-dashcard1 p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-lg flex items-center gap-x-2 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"/></svg>
                Food Details
            </h2>

            <input
                name="food_title"
                value={title}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2"
                placeholder="Food Title *"
            />

            <textarea
                name='food_description'
                value={description}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2"
                placeholder="Description *"
                rows="3"
            ></textarea>

            {/* 🔻 Updated Food Type Radio Buttons */}
            <div>
                <p className="font-medium mb-1">Food Type *</p>
                <div className="flex gap-6 text-sm text-gray-700">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="foodType" value={type} />
                        Vegetarian
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="foodType" value={type} />
                        Non-Vegetarian
                    </label>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <input
                    name='servings'
                    value={servings}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2"
                    placeholder="Number of Servings *"
                />
                <input
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2"
                    placeholder="Quantity/Weight"
                />
            </div>
        </div>

    )
}

export default FoodDetails;