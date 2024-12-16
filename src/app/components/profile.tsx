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
        background: 'linear-gradient(to right, #001f3d, #00457c)', // Custom navy blue gradient
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture}
            alt={`${user.name}'s profile picture`}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#001f3d] mb-4"
          />
          <h2 className="text-4xl font-extrabold text-[#001f3d] mb-4">
            {user.name}
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-xl font-medium text-[#003366]">Email:</p>
              <p className="text-md text-[#4b7db3] border-2 border-[#001f3d] rounded-md px-4 py-2">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-xl font-medium text-[#003366]">Phone:</p>
              <p className="text-md text-[#4b7db3] border-2 border-[#001f3d] rounded-md px-4 py-2">
                {user.phone}
              </p>
            </div>
            <div>
              <p className="text-xl font-medium text-[#003366]">Address:</p>
              <p className="text-md text-[#4b7db3] border-2 border-[#001f3d] rounded-md px-4 py-2">
                {user.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => alert("Edit Profile")}
            className="w-full bg-[#001f3d] text-white py-3 rounded-lg font-semibold hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3d] transform transition-all duration-300 hover:scale-[1.02]"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
