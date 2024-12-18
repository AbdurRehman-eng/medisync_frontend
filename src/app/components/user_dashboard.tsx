"use client";

import { useEffect, useState } from "react";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebase";

function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a user is currently signed in
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Set the current user
    } else {
      router.push("/pages/login"); // Redirect to login if no user is signed in
    }
    setLoading(false);
  }, [auth, router]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/pages/login"); // Redirect to login on sign out
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
      title: "Go to Profile",
      description: "View and edit your personal information.",
      buttonText: "Go to Profile",
      route: "/pages/profile",
    },
    {
      title: "Add Appointment",
      description: "Schedule an appointment.",
      buttonText: "Add Appointment",
      route: "/pages/add_appointment",
    },
    {
      title: "Appointment Status",
      description: "Check the status of your appointments.",
      buttonText: "View Status",
      route: "/pages/appointment_status",
    },
    {
      title: "Go to Search",
      description: "Search for medical information.",
      buttonText: "Search Now",
      route: "/pages/search",
    },
  ];

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center py-10 bg-mainBg">
      {/* Header */}
      <div className="h-20 w-full bg-[#213555] fixed top-0 left-0 flex justify-between items-center px-6 z-[1000]">
        <h1 className="text-white text-3xl font-extrabold">User Dashboard</h1>

        {/* Sign-Out Button */}
        <button
          onClick={handleSignOut}
          className="bg-[#ffffff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a6ed7] transform transition-all duration-300 hover:scale-[1.02] py-2 px-4 rounded-lg font-semibold"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome Message */}
      {user && (
        <p className="text-black text-5xl font-extrabold mt-48 block bg-clip-text text-transparent bg-mainAccent">
          Welcome, {user.email}
        </p>
      )}

      {/* Content below the fixed header */}
      <div className="flex-grow flex flex-col items-center justify-center w-full px-6 pt-24 h-[100vh]">
        {/* Grid Layout for Cards (2x2 Matrix) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full mb-[10vh]">
          {cards.map(({ title, description, buttonText, route }) => (
            <div
              key={title}
              className="bg-secAccent p-6 rounded-xl shadow-xl transition transform hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-bold mb-4 text-[#00457c]">{title}</h2>
              <p className="text-gray-600 mb-6">{description}</p>
              <button
                onClick={() => router.push(route)}
                className="w-full bg-[#213555] text-white font-semibold py-3 rounded-lg transition"
              >
                {buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
