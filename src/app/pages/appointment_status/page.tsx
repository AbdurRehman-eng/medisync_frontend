'use client';
import { useState, ChangeEvent } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';

// Define types for form data and appointment status
interface FormData {
  patient_id: string;
  patient_name: string;
}

interface Appointment {
  doctor_name: string;
  confirm: boolean;
}

export default function AppointmentStatus() {
  const [formData, setFormData] = useState<FormData>({
    patient_id: '',
    patient_name: ''
  });
  const [appointmentStatus, setAppointmentStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Check appointment status
  const handleCheckStatus = async () => {
    const { patient_id, patient_name } = formData;

    if (!patient_id || !patient_name) {
      setError('Please enter both Patient ID and Patient Name');
      return;
    }

    setLoading(true);
    setError(null);
    setAppointmentStatus('');
    try {
      const { data, error } = await supabase
        .from<Appointment>('appointment') // Table name: 'appointment', Type: Appointment
        .select('doctor_name, confirm')
        .eq('patient_id', patient_id)
        .eq('patient_name', patient_name);

      if (error || !data || data.length === 0) {
        setError('No appointments found for the given Patient ID and Name.');
      } else {
        // Explicitly type the parameter for map
        const statuses = data.map((appointment) => {
          const { doctor_name, confirm } = appointment;
          return confirm
            ? `Your appointment with Dr. ${doctor_name} is accepted.`
            : `Your appointment with Dr. ${doctor_name} is not yet accepted.`;
        });

        setAppointmentStatus(statuses.join('\n')); // Combine all statuses into a single string
      }
    } catch (err) {
      setError('An unexpected error occurred while checking the appointment status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Check Appointment Status</h1>

      {/* Display error message */}
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {/* Display appointment status */}
      {appointmentStatus && (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            color: 'green',
            padding: '10px',
            border: '1px solid green',
            borderRadius: '5px',
            marginBottom: '20px'
          }}
        >
          {appointmentStatus}
        </div>
      )}

      {/* Input form */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="patient_id" style={{ display: 'block', marginBottom: '5px' }}>
          Patient ID:
        </label>
        <input
          id="patient_id"
          type="number"
          name="patient_id"
          value={formData.patient_id}
          onChange={handleChange}
          placeholder="Enter Patient ID"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="patient_name" style={{ display: 'block', marginBottom: '5px' }}>
          Patient Name:
        </label>
        <input
          id="patient_name"
          type="text"
          name="patient_name"
          value={formData.patient_name}
          onChange={handleChange}
          placeholder="Enter Patient Name"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      <button
        onClick={handleCheckStatus}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Status'}
      </button>

      {/* Display loading message */}
      {loading && <div style={{ marginTop: '20px', textAlign: 'center' }}>Checking appointment status...</div>}
    </div>
  );
}
