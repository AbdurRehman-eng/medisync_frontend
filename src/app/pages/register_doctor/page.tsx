'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';
import { useRouter } from 'next/navigation';

interface DoctorData {
  name: string;
  clinic_location: string;
  contact: string;
  specialization: string;
  email: string;
}

export default function RegisterDoctor() {
  const [formData, setFormData] = useState<DoctorData>({
    name: '',
    clinic_location: '',
    contact: '',
    specialization: '',
    email: '',
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!formData.name || !formData.clinic_location || !formData.contact || !formData.specialization || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Step 1: Fetch the maximum `id` from the doctor table
      const { data: doctorMaxData, error: doctorMaxError } = await supabase
        .from('doctor')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (doctorMaxError) throw new Error(doctorMaxError.message);

      let newDoctorId = 1; // Default to 1 if no doctor exists
      if (doctorMaxData && doctorMaxData.length > 0) {
        newDoctorId = doctorMaxData[0].id + 1; // Increment the max id
      }

      // Step 2: Fetch the maximum `user_id` from the user table
      const { data: userMaxData, error: userMaxError } = await supabase
        .from('user')
        .select('user_id')
        .order('user_id', { ascending: false })
        .limit(1);

      if (userMaxError) throw new Error(userMaxError.message);

      let newUserId = 1; // Default to 1 if no user exists
      if (userMaxData && userMaxData.length > 0) {
        newUserId = userMaxData[0].user_id + 1; // Increment the max user_id
      }

      // Step 3: Insert the doctor into the doctor table with the calculated ID
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctor')
        .insert([
          {
            id: newDoctorId, // Use the calculated doctor ID
            name: formData.name,
            clinic_location: formData.clinic_location,
            contact: formData.contact,
            specialization: formData.specialization,
            email: formData.email,
          },
        ])
        .select('*')
        .single();

      if (doctorError) throw new Error(doctorError.message);

      // Log inserted doctor data for debugging
      console.log('Inserted doctor data:', doctorData);

      // Step 4: Insert the user into the user table with the calculated user_id
      const { error: userInsertError } = await supabase
        .from('user')
        .insert([
          {
            user_id: newUserId, // Use the calculated user ID
            id: newDoctorId, // Link this user to the doctor using the same ID
            type: 'doctor',
          },
        ]);

      if (userInsertError) throw new Error(userInsertError.message);

      // Step 5: Set success message and reset form
      setSuccessMessage('Doctor registered successfully!');
      setError('');

      // Reset form
      setFormData({
        name: '',
        clinic_location: '',
        contact: '',
        specialization: '',
        email: '',
      });

      // Redirect to the dashboard
      router.push('/pages/dashboard');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setSuccessMessage('');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(to right, #001f3d, #00457c)", // Custom navy blue gradient
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-[#001f3d] text-center mb-6">Register Doctor</h2>

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
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="e.g., Dr. Muhammad Zain-Ul-Abideen"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Clinic Location */}
          <div>
            <label htmlFor="clinic_location" className="block text-lg font-medium text-[#003366]">
              Clinic Location
            </label>
            <input
              type="text"
              id="clinic_location"
              name="clinic_location"
              placeholder="e.g., Care Clinic"
              value={formData.clinic_location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-lg font-medium text-[#003366]">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="e.g., +923123456789"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className="block text-lg font-medium text-[#003366]">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              placeholder="e.g., Cardiology"
              value={formData.specialization}
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
              placeholder="e.g., abc@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#001f3d] text-white py-3 rounded-lg font-semibold hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3d] transform transition-all duration-300 hover:scale-[1.02]"
          >
            Register Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
