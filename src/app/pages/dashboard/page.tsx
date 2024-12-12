"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebase";

function Main() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a user is currently signed in
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Set the current user
    } else {
      router.push("login"); // Redirect to login if no user is signed in
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user && <p>Signed in as: {user.email}</p>}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Main;
