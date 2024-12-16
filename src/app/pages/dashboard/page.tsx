"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebase";
import Main from "@/app/components/user_dasboard";
import DoctorDashboard from "@/app/components/doctor_dashboard";
import PharmacistDashboard from "@/app/components/pharmacist_dashboard";

function Dashboard() {
  return(
    <div>
      <Main />
    </div>
  );
}

export default Dashboard;
