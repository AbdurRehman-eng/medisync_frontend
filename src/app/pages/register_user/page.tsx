"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/app/supabase/supabaseclient";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";  // Import Firebase auth configuration

function RegisterPatient() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate form data
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.address ||
      !formData.contact ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      return;
    }
  
    try {
  const { error: patientError } = await supabase
    .from("patient")
    .insert([
      {
        id: newPatientId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        address: formData.address,
        contact: formData.contact,
        email: formData.email,
        password: formData.password,
      },
    ]);

  if (patientError) {
    setError(`Error adding patient: ${patientError.message}`);
    return;
  }

  // Insert into user table
  const { error: userInsertError } = await supabase.from("user").insert([
    {
      user_id: newUserId,
      type: "patient",
      email: formData.email,
      id: newPatientId,
    },
  ]);

  if (userInsertError) {
    setError(`Error adding user: ${userInsertError.message}`);
    return;
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  );
  if (userCredential.user) {
    console.log("Firebase User created:", userCredential.user);
  }

  setSuccessMessage("Patient registered successfully!");
  setError(null);

  setFormData({
    first_name: "",
    last_name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
  });

  router.push("/pages/login");
} catch (err: unknown) {
  if (err instanceof Error) {
    setError(`An error occurred: ${err.message}`);
  } else {
    setError("An unknown error occurred");
  }
}
  
  
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Register Patient</h1>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {successMessage && (
        <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="first_name" style={{ fontWeight: "bold" }}>
            First Name:
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="last_name" style={{ fontWeight: "bold" }}>
            Last Name:
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="address" style={{ fontWeight: "bold" }}>
            Address:
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="contact" style={{ fontWeight: "bold" }}>
            Contact:
          </label>
          <input
            type="text"
            name="contact"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="email" style={{ fontWeight: "bold" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register Patient
        </button>
      </form>
    </div>
  );
}
