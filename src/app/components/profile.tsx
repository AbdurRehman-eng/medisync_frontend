"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

const ProfilePage: React.FC<{ user: UserProfile }> = ({ user }) => {
  const history = useRouter(); // Hook for navigation

  const handleEditProfile = () => {
    history.push("/pages/edit_profile"); // Redirect to EditProfilePage
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Profile Header */}
      <div className="w-full bg-green-600 py-6 flex justify-center">
        <h1 className="text-white text-2xl font-semibold">User Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg mt-6 p-6 w-full max-w-md">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={user.profilePicture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
          />
        </div>

        {/* User Information */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>

        {/* Contact Details */}
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-gray-700 font-semibold">Phone</h3>
            <p className="text-gray-600">{user.phone}</p>
          </div>

          <div>
            <h3 className="text-gray-700 font-semibold">Address</h3>
            <p className="text-gray-600">{user.address}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleEditProfile}
            className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
