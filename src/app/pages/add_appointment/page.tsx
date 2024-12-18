'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';
import { useUserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { userId } = useUserContext(); // Access the user_id from the context
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

  // Fetch patient name from the 'patient' table based on user_id
  const fetchPatientName = async (userId: string) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('id')
        .eq('user_id', userId)
        .single(); // Get single user
      if (userError || !userData) {
        throw new Error('Error fetching user data.');
      }

      const userIdFromDb = userData.id;

      const { data: patientData, error: patientError } = await supabase
        .from('patient')
        .select('first_name, last_name')
        .eq('id', userIdFromDb)
        .single(); // Get single patient

      if (patientError || !patientData) {
        throw new Error('Error fetching patient name.');
      }

      setFormData((prev) => ({
        ...prev,
        patient_id: userIdFromDb,
        patient_name: `${patientData.first_name} ${patientData.last_name}`,
      }));
    } catch (err) {
      setError('Error fetching patient name.');
    }
  };

  // Fetch doctor details
  const fetchDoctors = async () => {
    setLoadingDoctors(true);
    try {
      const { data, error } = await supabase.from('doctor').select('*');
      if (error) throw error;
      setDoctorData(data || []);
    } catch (err) {
      setError('Error fetching doctor details.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const { data, error } = await supabase.from('appointment').insert([formData]);

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
    router.push("/pages/dashboard");
  };

  // Fetch patient name when user_id changes
  useEffect(() => {
    if (userId) {
      fetchPatientName(userId);
    }
  }, [userId]);

  // Fetch doctors when component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-[#213555] flex items-center justify-center bg-[#213555] p-8">
      <div className="h-20"></div>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-[#001f3d] text-center mb-6">
          Add Appointment
        </h2>

        {/* Display error message */}
        {error && <div className="text-red-600 mb-4 bg-red-100 p-2 rounded">{error}</div>}

        {/* Display success message */}
        {successMessage && (
          <div className="text-green-600 mb-4 bg-green-100 p-2 rounded">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-[#003366]">Patient Name</label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none bg-gray-200 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-[#003366]">Select Doctor</label>
            <select
              name="doctor_id"
              value={formData.doctor_id}
              onChange={(e) => {
                const doctorId = e.target.value;
                const selectedDoctor = doctorData.find((doctor) => doctor.id.toString() === doctorId);
                if (selectedDoctor) {
                  setFormData((prev) => ({
                    ...prev,
                    doctor_id: doctorId,
                    doctor_name: selectedDoctor.name
                  }));
                }
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
              required
            >
              <option value="">Select a doctor</option>
              {doctorData.map((doctor) => (
                <option key={doctor.id} value={doctor.id.toString()}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-[#003366]">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-[#003366]">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00457c] text-white py-3 rounded-lg font-semibold hover:bg-[#00345a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00457c] transform transition-all duration-300 hover:scale-[1.02]"
          >
            Add Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
