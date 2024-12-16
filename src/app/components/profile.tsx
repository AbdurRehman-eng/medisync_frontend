"use client"; // This line marks the component as a client component

import React from "react";

// Define the types for the user prop
interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

// ProfilePage component that accepts user data as props
const ProfilePage = ({ user }: { user: User }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(to right, #001f3d, #00457c)", // Custom navy blue gradient
      }}
    >
      {/* Card container */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture}
            alt={`${user.name}'s profile picture`}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#001f3d] mb-4 transform transition-all duration-300 hover:scale-110"
          />
          <h2 className="text-4xl font-extrabold text-[#001f3d] mb-4 transition-all duration-300 hover:text-[#00457c]">
            {user.name}
          </h2>
          <div className="space-y-6 w-full">
            {/* Email */}
            <div className="transition-all duration-300">
              <p className="text-lg font-semibold text-[#003366] transition-all duration-300">
                Email:
              </p>
              <p className="text-md text-gray-700 border-2 border-[#001f3d] rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:text-[#003366]">
                {user.email}
              </p>
            </div>

            {/* Phone */}
            <div className="transition-all duration-300">
              <p className="text-lg font-semibold text-[#003366] transition-all duration-300">
                Phone:
              </p>
              <p className="text-md text-gray-700 border-2 border-[#001f3d] rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:text-[#003366]">
                {user.phone}
              </p>
            </div>

            {/* Address */}
            <div className="transition-all duration-300">
              <p className="text-lg font-semibold text-[#003366] transition-all duration-300">
                Address:
              </p>
              <p className="text-md text-gray-700 border-2 border-[#001f3d] rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:text-[#003366]">
                {user.address}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => alert("Edit Profile")}
            className="w-full bg-[#001f3d] text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:bg-[#00457c] hover:scale-105"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
