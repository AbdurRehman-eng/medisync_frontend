"use client";
import React, { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

const EditProfilePage: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    profilePicture: user.profilePicture,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would handle the save logic, like making an API call to update the profile
    console.log("Profile updated:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Profile Header */}
      <div className="w-full bg-green-600 py-6 flex justify-center">
        <h1 className="text-white text-2xl font-semibold">Edit Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg mt-6 p-6 w-full max-w-md">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={formData.profilePicture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
          />
        </div>

        {/* Edit Form */}
        <div className="mt-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          />

          <label className="block text-gray-700 mt-4">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          />

          <label className="block text-gray-700 mt-4">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          />

          <label className="block text-gray-700 mt-4">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;

// Example Usage


// Render the page
// ReactDOM.render(<EditProfilePage user={mockUser} />, document.getElementById('root'));
