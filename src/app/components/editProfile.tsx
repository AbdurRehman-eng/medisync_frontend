"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

const fetchUserProfile = async (userId: string): Promise<User | null> => {
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

    let name: string, phone: string, address: string;

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
      profilePicture:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png", // Placeholder image
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const EditProfilePage: React.FC = () => {
  const { userId } = useUserContext();
  const router = useRouter();
  const [formData, setFormData] = useState<User | null>(null);
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
      const { name, email, phone, address } = formData;

      const { data: userData, error: userError } = await supabase
        .from<UserTable>("user")
        .select("id, type")
        .eq("email", email)
        .single();

      if (userError || !userData) throw new Error("User data not found");

      const { type, id } = userData;
      let profileData: any = { id };

      if (type === "patient") {
        const nameParts = name.split(" ");
        if (nameParts.length < 2) {
          alert("Please enter both first and last names.");
          return;
        }
        profileData = {
          first_name: nameParts[0],
          last_name: nameParts.slice(1).join(" "),
          contact: phone,
          address,
        };
      } else if (type === "pharmacist") {
        profileData = { name, phone, address };
      } else if (type === "doctor") {
        profileData = { name, contact: phone, clinic_location: address };
      }

      const { error: upsertError } = await supabase
        .from(type)
        .upsert(profileData, { onConflict: "id" });

      if (upsertError) throw new Error(upsertError.message);

      alert("Profile updated successfully!");
      router.push("/pages/profile");
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

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg mt-6 p-6 w-full max-w-md">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={formData.profilePicture}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#001f3d] mb-4"
          />
          <h2 className="text-4xl font-extrabold text-[#001f3d]">Edit Profile</h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-[#003366]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
              value={formData.phone}
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
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
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
