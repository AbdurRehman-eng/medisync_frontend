'use client';

import { useEffect, useState } from "react";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebase";

function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      router.push("/pages/login");
    }
    setLoading(false);
  }, [auth, router]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/pages/login");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  const cards = [
    {
      title: "Search Medicine",
      description: "Find the medicines you need in our database.",
      buttonText: "Search Now",
      route: "/pages/search",
    },
    {
      title: "Profile",
      description: "View and edit your personal details.",
      buttonText: "View Profile",
      route: "/pages/profile",
    },
    {
      title: "Add Appointment",
      description: "Add new patient appointments to your schedule.",
      buttonText: "Add Appointment",
      route: "/pages/add_appointment",
    },
    {
      title: "Check Appointments",
      description: "View your upcoming appointments and schedules.",
      buttonText: "Check Appointments",
      route: "/pages/check_appointment",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10"
      style={{
        background: "linear-gradient(to right, #001f3d, #00457c)",
      }}
    >
      {/* Header */}
      <div className="h-20 w-full bg-gradient-to-t from-[#001f3d] to-[#00457c] fixed top-0 left-0 flex justify-between items-center px-6 z-[1000]">
        <h1 className="text-white text-3xl font-extrabold">Doctor Dashboard</h1>
        {user && (
          <p className="text-gray-300 text-lg">
            Welcome, <span className="font-semibold">{user.email}</span>
          </p>
        )}
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-grow flex flex-col justify-center items-center w-full mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-6">
          {/* Dashboard Cards */}
          {[
            {
              title: "Search Medicine",
              description: "Find the medicines you need in our database.",
              buttonText: "Search Now",
              route: "/pages/search",
            },
            {
              title: "Profile",
              description: "View and edit your personal details.",
              buttonText: "View Profile",
              route: "/pages/profile",
            },
            {
              title: "Add Appointment",
              description: "Add new patient appointments to your schedule.",
              buttonText: "Add Appointment",
              route: "/pages/add_appointment",
            },
            {
              title: "Check Appointments",
              description: "View your upcoming appointments and schedules.",
              buttonText: "Check Appointments",
              route: "/pages/check_appointment",
            },
            {
              title: "Sign Out",
              description: "Log out of your doctor dashboard.",
              buttonText: "Sign Out",
              route: "",
              handleClick: handleSignOut,
              color: "bg-[#d12222]",
              hoverColor: "hover:bg-[#a91a1a]",
              titleColor: "text-[#d12222]",
            },
          ].map(
            ({
              title,
              description,
              buttonText,
              route,
              handleClick,
              color = "bg-[#001f3d]",
              hoverColor = "hover:bg-[#00345a]",
              titleColor = "text-[#00457c]",
            }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-xl shadow-xl transition transform hover:scale-[1.02]"
              >
                <h2 className={`text-2xl font-bold mb-4 ${titleColor}`}>
                  {title}
                </h2>
                <p className="text-gray-600 mb-6">{description}</p>
                <button
                  onClick={handleClick || (() => router.push(route))}
                  className={`w-full ${color} text-white font-semibold py-3 rounded-lg ${hoverColor} focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3d] transition`}
                >
                  {buttonText}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
