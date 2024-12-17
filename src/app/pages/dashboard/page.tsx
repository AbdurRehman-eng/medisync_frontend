"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import UserDashboard from "@/app/components/user_dasboard";
import DoctorDashboard from "@/app/components/doctor_dashboard";
import PharmacistDashboard from "@/app/components/pharmacist_dashboard";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/app/supabase/supabaseclient";

// Initialize Supabase clien

const Dash = () => {
  const { userId, setUserId, userType, setUserType } = useUserContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          console.error("User ID not found in context");
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("user")
          .select("type")
          .eq("user_id", userId)
          .single(); // Assuming user_id is unique

        if (error) {
          console.error("Error fetching user data:", error.message);
          setLoading(false);
          return;
        }

        if (data) {
          setUserType(data?.type);
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, setUserType]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  // Render components based on userType
  return (
    <div>
      {userType === "pharmacist" && <PharmacistDashboard />}
      {userType === "doctor" && <DoctorDashboard />}
      {userType === "patient" && <UserDashboard />}
      {!userType && <div>User not found or invalid user type</div>}
    </div>
  );
};

export default Dash;
