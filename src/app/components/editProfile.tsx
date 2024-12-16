"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase/supabaseclient"; // Ensure supabase is configured
import { useUserContext } from "@/app/context/UserContext"; // Assuming userId is in context

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

const EditProfilePage: React.FC = () => {
  const { userId } = useUserContext();
  const router = useRouter();
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (userId) {
        const profile = await fetchUserProfile(userId);
        if (profile) {
          setFormData(profile);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    if (!formData) return;
  
    try {
      // Destructure form data
      const { name, email, phone, address } = formData;
  
      // Get user type and ID
      const { data: userData, error: userError } = await supabase
        .from<UserTable>("user")
        .select("id, type")
        .eq("email", email)
        .single();
  
      if (userError || !userData) throw new Error("User data not found");
  
      const { type, id } = userData;
      let tableName: string = type;
  
      // Construct the profile data to be updated
      let profileData: any = { id, contact: phone, clinic_location: address };
  
      // Add additional fields based on user type
      if (type === "patient") {
        const [first_name, last_name] = name.split(" ");
        profileData = { ...profileData, first_name, last_name }; // Patient uses first_name and last_name
      } else if (type === "pharmacist") {
        profileData = { ...profileData, name, phone }; // Pharmacist uses name and phone directly
      } else if (type === "doctor") {
        profileData = { ...profileData, name, contact: phone }; // Doctor uses name and contact
      }
  
      // Perform upsert to update the corresponding table
      const { error: upsertError } = await supabase
        .from(tableName)
        .upsert(profileData, { onConflict: "id" });
  
      if (upsertError) throw new Error(upsertError.message);
  
      alert("Profile updated successfully!");
      router.push("/pages/profile"); // Redirect to profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    }
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

  if (!formData) {
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
            disabled
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg bg-gray-100"
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
