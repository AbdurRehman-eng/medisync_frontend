"use client"; // Mark this file as a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

const EditProfilePage = ({ user }: { user: User }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const router = useRouter();

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
    router.push("/pages/profile");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(to right, #001f3d, #00457c)", // Custom navy blue gradient
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={updatedUser.profilePicture}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#001f3d] mb-4"
          />
          <h2 className="text-4xl font-extrabold text-[#001f3d]">
            Edit Profile
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-[#003366]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#003366]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-[#003366]">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={updatedUser.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-lg font-medium text-[#003366]">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={updatedUser.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#001f3d] text-white py-3 rounded-lg font-semibold hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3d] transform transition-all duration-300 hover:scale-[1.02]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
