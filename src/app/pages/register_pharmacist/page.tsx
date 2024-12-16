'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';

interface PharmacistData {
  id: number | '';
  name: string;
  address: string;
  email: string;
  phone: string;
}

export default function RegisterPharmacist() {
  const [formData, setFormData] = useState<PharmacistData>({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.address || !formData.email || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const { error } = await supabase.from('pharmacist').insert([formData]);

      if (error) {
        setError(`Error: ${error.message}`);
        setSuccessMessage('');
      } else {
        setSuccessMessage('Pharmacist registered successfully!');
        setError('');

        setFormData({
          id: '',
          name: '',
          address: '',
          email: '',
          phone: '',
        });
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(to right, #001f3d, #00457c)', // Custom navy blue gradient
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-[#001f3d] text-center mb-6">
          Register Pharmacist
        </h2>

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID */}
          <div>
            <label htmlFor="id" className="block text-lg font-medium text-[#003366]">
              ID
            </label>
            <input
              type="number"
              id="id"
              name="id"
              placeholder="e.g., 101"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-[#003366]">
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
            <label htmlFor="address" className="block text-lg font-medium text-[#003366]">
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
            <label htmlFor="email" className="block text-lg font-medium text-[#003366]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g.,abc@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-[#003366]">
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
