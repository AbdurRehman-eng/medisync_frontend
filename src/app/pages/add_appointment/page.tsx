'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';

interface Doctor {
  id: number;
  name: string;
  clinic_location: string;
  contact: string;
  specialization: string;
  email: string;
}

interface FormData {
  patient_id: string;
  patient_name: string;
  doctor_id: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
}

export default function Appointment() {
  const [formData, setFormData] = useState<FormData>({
    patient_id: '',
    patient_name: '',
    doctor_id: '',
    doctor_name: '',
    start_time: '',
    end_time: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.patient_id ||
      !formData.patient_name ||
      !formData.doctor_id ||
      !formData.doctor_name ||
      !formData.start_time ||
      !formData.end_time
    ) {
      setError('Please fill in all fields');
      return;
    }

    const { data: newData, error } = await supabase
      .from('appointment')
      .insert([formData]);

    if (error) {
      setError(`Error: ${error.message}`);
      setSuccessMessage('');
    } else {
      setSuccessMessage('Appointment added successfully!');
      setError('');

      // Reset form fields
      setFormData({
        patient_id: '',
        patient_name: '',
        doctor_id: '',
        doctor_name: '',
        start_time: '',
        end_time: ''
      });
    }
  };

  // Fetch doctor details
  const handleFetchDoctors = async () => {
    setLoadingDoctors(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('doctor').select('*');
      if (error) {
        setError(`Error fetching doctor details: ${error.message}`);
      } else {
        setDoctorData(data || []);
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching doctor details.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#173b2b] to-[#2a5c46] p-8">
      <h1 className="text-3xl text-white font-bold mb-6">Add Appointment</h1>

      {/* Display error message */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Display success message */}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      {/* Appointment Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient ID:</label>
            <input
              type="number"
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name:</label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor ID:</label>
            <input
              type="number"
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor Name:</label>
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time:</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time:</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <button type="submit" className="mt-6 w-full px-4 py-2 bg-[#173b2b] text-white rounded-md hover:bg-[#133224] transform transition-all hover:scale-[1.02]">
          Add Appointment
        </button>
      </form>

      {/* Doctors Detail Button */}
      <div className="mt-6">
        <button
          onClick={handleFetchDoctors}
          className="px-6 py-2 bg-[#173b2b] text-white rounded-md hover:bg-[#133224] transform transition-all hover:scale-[1.02]"
        >
          Show Doctors
        </button>
      </div>

      {/* Doctors Details Table */}
      {loadingDoctors && <div className="text-white mt-4">Loading doctor details...</div>}
      {!loadingDoctors && doctorData.length > 0 && (
        <table className="mt-8 w-full table-auto border-collapse border border-gray-300 text-white">
          <thead className="bg-[#173b2b]">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Clinic Location</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">Specialization</th>
              <th className="p-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700">
            {doctorData.map((doctor) => (
              <tr key={doctor.id}>
                <td className="p-2">{doctor.id}</td>
                <td className="p-2">{doctor.name}</td>
                <td className="p-2">{doctor.clinic_location}</td>
                <td className="p-2">{doctor.contact}</td>
                <td className="p-2">{doctor.specialization}</td>
                <td className="p-2">{doctor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loadingDoctors && doctorData.length === 0 && <div className="mt-4 text-white">No doctors found.</div>}
    </div>
  );
}
