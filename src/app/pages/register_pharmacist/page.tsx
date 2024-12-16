'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/app/supabase/supabaseclient";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // FontAwesome for password visibility toggle

export default function RegisterPharmacist() {
  const [formData, setFormData] = useState({
    name: "", // Single name field
    pharmacy_name: "",
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
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.pharmacy_name.trim()) return "Pharmacy name is required.";
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
    setError(null);
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { data: maxIdData, error: maxIdError } = await supabase
        .from("pharmacist")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);

      if (maxIdError) {
        setError(`Error retrieving ID: ${maxIdError.message}`);
        return;
      }

      const highestId = maxIdData?.[0]?.id || 0;
      const newId = highestId + 1;

      const { data: pharmacistData, error: pharmacistError } = await supabase
        .from("pharmacist")
        .insert([{
          id: newId,
          name: formData.name, // Single name field
          pharmacy_name: formData.pharmacy_name,
          address: formData.address,
          phone: formData.contact,
          email: formData.email,
          password: formData.password,
        }]);

      if (pharmacistError) {
        setError(`Error adding pharmacist: ${pharmacistError.message}`);
        return;
      }

      const { error: userInsertError } = await supabase.from("user").insert([{
        id: newId,
        type: "pharmacist",
      }]);

      if (userInsertError) {
        setError(`Error adding user: ${userInsertError.message}`);
        return;
      }

      setSuccessMessage("Pharmacist registered successfully!");
      setError(null);

      setFormData({
        name: "",
        pharmacy_name: "",
        address: "",
        contact: "",
        email: "",
        password: "",
      });

      router.push("/pages/dashboard");
    } catch (err) {
      setError("An unexpected error occurred.");
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
          Register as a Pharmacist
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
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Abdullah Ijaz"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="pharmacy_name"
              className="block text-lg font-medium text-[#003366]"
            >
              Pharmacy Name
            </label>
            <input
              type="text"
              id="pharmacy_name"
              name="pharmacy_name"
              value={formData.pharmacy_name}
              onChange={handleChange}
              placeholder="e.g., Central Pharmacy"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
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
            Register Pharmacist
          </button>
        </form>
      </div>
    </div>
  );
}
