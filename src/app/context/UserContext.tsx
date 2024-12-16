"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the UserContext type
interface UserContextType {
  userId: string | null;
  setUserId: (userId: string) => void;
  userType: string | null;
  setUserType: (userType: string) => void;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// UserProvider component that manages the user state
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserIdState] = useState<string | null>(null);
  const [userType, setUserTypeState] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the userId from sessionStorage when the component mounts
    const storedUserId = sessionStorage.getItem("user_id");
    const storedUserType = sessionStorage.getItem("user_type");
    if (storedUserId) {
      setUserIdState(storedUserId);
    }
    if (storedUserType) {
      setUserTypeState(storedUserType);
    }
  }, []);

  // Set userId and userType and update the state
  const setUserId = (userId: string) => {
    setUserIdState(userId);
    sessionStorage.setItem("user_id", userId); // Save to sessionStorage
  };

  const setUserType = (userType: string) => {
    setUserTypeState(userType);
    sessionStorage.setItem("user_type", userType); // Save to sessionStorage
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
