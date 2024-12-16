'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/app/supabase/supabaseclient";
import { useRouter } from "next/navigation";

export default function RegisterPharmacist() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Validation function
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!formData.name.trim()) return "Name is required.";
    if (!formData.address.trim()) return "Address is required.";
    if (!emailRegex.test(formData.email)) return "Invalid email format.";
    if (!phoneRegex.test(formData.phone)) return "Invalid phone number format.";
    return null;
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    // Validate the form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Step 1: Get the highest ID from the pharmacist table
      const { data: maxIdData, error: maxIdError } = await supabase
        .from("pharmacist")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);

      if (maxIdError) {
        setError(`Error retrieving ID: ${maxIdError.message}`);
        return;
      }

      // Determine the new ID
      const highestId = maxIdData?.[0]?.id || 0; // If no rows exist, start with ID 1
      const newId = highestId + 1;

      // Step 2: Insert into the pharmacist table
      const { error: pharmacistError } = await supabase.from("pharmacist").insert([
        {
          id: newId, // Assign the new ID manually
          name: formData.name,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
        },
      ]);

      if (pharmacistError) {
        setError(`Error adding pharmacist: ${pharmacistError.message}`);
        return;
      }

      // Step 3: Insert into the user table
      const { error: userInsertError } = await supabase.from("user").insert([
        {
          id: newId, // Use the same ID
          type: "pharmacist",
        },
      ]);

      if (userInsertError) {
        setError(`Error adding user: ${userInsertError.message}`);
        return;
      }

      // Success
      setSuccessMessage("Pharmacist registered successfully!");
      setFormData({ name: "", address: "", email: "", phone: "" });
      setTimeout(() => router.push("/pages/dashboard"), 2000); // Redirect to dashboard after success
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(to right, #001f3d, #00457c)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-3xl font-extrabold text-[#001f3d] text-center mb-6">
          Register Pharmacist
        </h1>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-600 text-center mb-4 bg-green-100 p-2 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-[#003366]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Abdullah Ijaz"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium text-[#003366]"
            >
              Pharmacy Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="e.g., 123 Main St, City"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Email */}
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
              placeholder="e.g., abc@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-medium text-[#003366]"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="e.g., +923456789012"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#001f3d] text-white py-3 rounded-lg font-semibold hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3d] transform transition-all duration-300 hover:scale-[1.02]"
          >
            Register Pharmacist
          </button>
        </form>
      </div>
    </div>
  );
}
