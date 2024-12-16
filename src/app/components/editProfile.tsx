"use client"; // Mark this file as a client component

import React, { useState } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

const EditProfilePage = ({ user }: { user: User }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient p-4"> {/* Apply custom gradient */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#173b2b]">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173b2b] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173b2b] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={updatedUser.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173b2b] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={updatedUser.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173b2b] transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#173b2b] text-white py-3 rounded-lg font-semibold hover:bg-[#2a5c46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#173b2b] transform transition-all duration-300 hover:scale-[1.02]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
