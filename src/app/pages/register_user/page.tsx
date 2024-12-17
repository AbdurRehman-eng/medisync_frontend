"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/app/supabase/supabaseclient";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";  // Import Firebase auth configuration

export default function RegisterPatient() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    if (!formData.first_name.trim()) return "First name is required.";
    if (!formData.last_name.trim()) return "Last name is required.";
    if (!formData.address.trim()) return "Address is required.";
    if (!formData.contact.trim() || !/^\+?[0-9]{10,15}$/.test(formData.contact))
      return "Invalid contact number.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return "Invalid email address.";
    if (!formData.password.trim() || formData.password.length < 6)
      return "Password must be at least 6 characters long.";
    return null;
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
      // Step 1: Get the highest user_id from the user table
      const { data: maxUserIdData, error: maxUserIdError } = await supabase
        .from("user")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);
  
      if (maxUserIdError) {
        setError(`Error retrieving max user_id: ${maxUserIdError.message}`);
        return;
      }
  
      // Determine the new user_id (max(user_id) + 1)
      const highestUserId = maxUserIdData?.[0]?.id || 0; // If no rows exist, start with ID 1
      const newUserId = highestUserId + 1;
  
      // Step 2: Get the highest id from the patient table
      const { data: maxPatientIdData, error: maxPatientIdError } = await supabase
        .from("patient")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);
  
      if (maxPatientIdError) {
        setError(`Error retrieving max patient_id: ${maxPatientIdError.message}`);
        return;
      }
  
      // Determine the new patient_id (max(patient_id) + 1)
      const highestPatientId = maxPatientIdData?.[0]?.id || 0; // If no rows exist, start with ID 1
      const newPatientId = highestPatientId + 1;
  
      // Step 3: Insert into the patient table with the new patient_id
      const { data: patientData, error: patientError } = await supabase
        .from("patient")
        .insert([
          {
            id: newPatientId, // Use the new patient_id
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
  
      // Step 4: Insert into the user table with the new user_id and type "patient"
      const { error: userInsertError } = await supabase.from("user").insert([
        {
          user_id: newUserId, // Use the new user_id
          type: "patient", // Set type to "patient"
          email: formData.email, // Include email from the form
          id: newPatientId, // Store the new patient_id in the user table
        },
      ]);
  
      if (userInsertError) {
        setError(`Error adding user: ${userInsertError.message}`);
        return;
      }
  
      // Firebase Registration (Example)
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      if (userCredential.user) {
        // Handle successful user creation with Firebase
        console.log("Firebase User created:", userCredential.user);
      }
  
      // Success message
      setSuccessMessage("Patient registered successfully!");
      setError(null);
  
      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        address: "",
        contact: "",
        email: "",
        password: "",
      });
  
      // Redirect to login page
      router.push("/pages/login");
    } catch (err: any) {
      // Handle errors thrown during the process
      setError(`An error occurred: ${err.message}`);
    }
  };  
  
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(to right, #001f3d, #00457c)",
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-[#001f3d] text-center mb-6">
          Register Patient
        </h2>

        {error && (
          <div className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="text-green-600 text-center mb-4 bg-green-100 p-2 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-lg font-medium text-[#003366]"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="e.g., Abdullah"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-lg font-medium text-[#003366]"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="e.g., Ijaz"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium text-[#003366]"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main Street"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-lg font-medium text-[#003366]"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g., +923456789012"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-[#003366]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., abc@example.com"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-[#003366]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#00457c] hover:text-[#001f3d]"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#001f3d] text-white py-3 rounded-lg font-semibold hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3d] transform transition-all duration-300 hover:scale-[1.02]"
          >
            Register Patient
          </button>
        </form>
      </div>
    </div>
  );
}
