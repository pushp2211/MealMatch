import React, { useState } from "react";

function PostFood() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    foodType: "Vegetarian",
    servings: "",
    quantity: "",
    address: "",
    availableUntil: "",
    startTime: "",
    endTime: "",
    isUrgent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with backend logic
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-y-auto bg-gradient-to-r from-[#f8f9fb] to-[#e7f0ff] p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-7xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#1e293b]">
          Post Available Food
        </h2>

        {/* Horizontal Cards */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Food Details Card */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow p-6 space-y-4">
            <h3 className="text-xl font-semibold text-[#334155] mb-2">
              Food Details
            </h3>

            <div>
              <label className="label">Food Title*</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Wedding Reception Surplus"
                required
                className="input"
              />
            </div>

            <div>
              <label className="label">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe the food items, cuisine type..."
                className="input h-24 resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="label">Food Type*</label>
                <select
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Vegetarian</option>
                  <option>Non-Vegetarian</option>
                  <option>Vegan</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="label">Estimated Servings*</label>
                <input
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  type="number"
                  required
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="label">Quantity Description</label>
              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 5 trays, 10kg rice"
                className="input"
              />
            </div>
          </div>

          {/* Location & Timing Card */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow p-6 space-y-4">
            <h3 className="text-xl font-semibold text-[#334155] mb-2">
              Location & Timing
            </h3>

            <div>
              <label className="label">Pickup Address*</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                required
                className="input"
              />
            </div>

            <div>
              <label className="label">Available Until*</label>
              <input
                name="availableUntil"
                value={formData.availableUntil}
                onChange={handleChange}
                type="datetime-local"
                required
                className="input"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="label">Pickup Start Time*</label>
                <input
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  type="time"
                  required
                  className="input"
                />
              </div>

              <div className="flex-1">
                <label className="label">Pickup End Time*</label>
                <input
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  type="time"
                  required
                  className="input"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                name="isUrgent"
                type="checkbox"
                checked={formData.isUrgent}
                onChange={handleChange}
                className="accent-red-600 h-4 w-4"
              />
              <label className="text-sm font-medium text-red-600">
                Mark as Urgent
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-8 py-2 rounded-full shadow transition"
          >
            Submit Food Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostFood;
