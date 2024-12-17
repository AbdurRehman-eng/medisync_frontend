"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase/supabaseclient"; // Ensure supabase is configured
import { useUserContext } from "@/app/context/UserContext"; // Assuming your context provides userId

interface PatientProfile {
  first_name: string;
  last_name: string;
  contact: string;
  address: string;
}

interface PharmacistProfile {
  name: string;
  phone: string;
  address: string;
}

interface DoctorProfile {
  name: string;
  contact: string;
  clinic_location: string;
}

interface UserTable {
  email: string;
  type: "patient" | "pharmacist" | "doctor";
  id: number;
}

type ProfileData = PatientProfile | PharmacistProfile | DoctorProfile;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // Fetch email, type, and id from the user table
    const { data: userData, error: userError } = await supabase
      .from<UserTable>("user")
      .select("email, type, id")
      .eq("user_id", userId)
      .single();

    if (userError || !userData) {
      throw new Error(userError?.message || "User not found");
    }

    const { email, type, id } = userData;

    // Fetch profile details from the corresponding table
    const { data: profileData, error: profileError } = await supabase
      .from(type) // Dynamic table name based on `type`
      .select("*")
      .eq("id", id)
      .single();

    if (profileError || !profileData) {
      throw new Error(profileError?.message || "Profile data not found");
    }

    // Construct UserProfile object based on type
    let name: string;
    let phone: string;
    let address: string;

    if (type === "patient") {
      const patientData = profileData as PatientProfile;
      name = `${patientData.first_name} ${patientData.last_name}`;
      phone = patientData.contact;
      address = patientData.address;
    } else if (type === "pharmacist") {
      const pharmacistData = profileData as PharmacistProfile;
      name = pharmacistData.name;
      phone = pharmacistData.phone;
      address = pharmacistData.address;
    } else if (type === "doctor") {
      const doctorData = profileData as DoctorProfile;
      name = doctorData.name;
      phone = doctorData.contact;
      address = doctorData.clinic_location;
    } else {
      throw new Error("Unknown user type");
    }

    return {
      name,
      email,
      phone,
      address,
      profilePicture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png", // Placeholder image
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const ProfilePage: React.FC = () => {
  const { userId } = useUserContext();
  const history = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (userId) {
        const profile = await fetchUserProfile(userId);
        if (profile) {
          setUserProfile(profile);
        } else {
          setError("Profile not found.");
        }
      } else {
        setError("User ID not available.");
      }
      setLoading(false);
    };

    loadUserProfile();
  }, [userId]);

  const handleEditProfile = () => {
    history.push("/pages/edit_profile"); // Redirect to EditProfilePage
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">No profile data found.</p>
      </div>
    );
  }

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
            alt={`${user.name}'s profile picture`}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#001f3d] mb-4 "
          />
          <h2 className="text-4xl font-extrabold text-[#001f3d] mb-4 ">
            {user.name}
          </h2>
          <div className="space-y-4 w-full">
            {/* Email */}
            <div className="transition-all duration-300">
              <p className="text-lg font-semibold text-[#003366] transition-all duration-300">
                Email:
              </p>
              <p className="text-md text-gray-700 border-2 border-[#001f3d] rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:text-[#003366]">
                {user.email}
              </p>
            </div>
            src={userProfile.profilePicture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
          />
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
        {/* User Information */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">{userProfile.name}</h2>
          <p className="text-sm text-gray-600">{userProfile.email}</p>
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
        {/* Contact Details */}
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-gray-700 font-semibold">Phone</h3>
            <p className="text-gray-600">{userProfile.phone}</p>
          </div>

          <div>
            <h3 className="text-gray-700 font-semibold">Address</h3>
            <p className="text-gray-600">{userProfile.address}</p>
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
