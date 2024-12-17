"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface MedicineContextType {
  medicineId: string | null;
  setMedicineId: (id: string | null) => void;
}

// Create the context
const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

// MedicineProvider to manage context state
export const MedicineProvider = ({ children }: { children: ReactNode }) => {
  const [medicineId, setMedicineId] = useState<string | null>(null);

  return (
    <MedicineContext.Provider value={{ medicineId, setMedicineId }}>
      {children}
    </MedicineContext.Provider>
  );
};

// Custom hook to access the Medicine Context
export const useMedicineContext = (): MedicineContextType => {
  const context = useContext(MedicineContext);
  if (!context) {
    throw new Error("useMedicineContext must be used within a MedicineProvider");
  }
  return context;
};
