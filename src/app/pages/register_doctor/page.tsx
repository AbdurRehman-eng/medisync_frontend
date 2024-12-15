'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';

interface DoctorData {
  id: number | '';
  name: string;
  clinic_location: string;
  contact: string;
  specialization: string;
  email: string;
}

export default function RegisterDoctor() {
  const [formData, setFormData] = useState<DoctorData>({
    id: '',
    name: '',
    clinic_location: '',
    contact: '',
    specialization: '',
    email: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!formData.id || !formData.name || !formData.clinic_location || !formData.contact || !formData.specialization || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase.from('doctor').insert([formData]);

      if (error) {
        setError(`Error: ${error.message}`);
        setSuccessMessage('');
      } else {
        setSuccessMessage('Doctor registered successfully!');
        setError('');

        // Reset form
        setFormData({
          id: '',
          name: '',
          clinic_location: '',
          contact: '',
          specialization: '',
          email: '',
        });
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Register Doctor</h1>

      {/* Display error message */}
      {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

      {/* Display success message */}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px', textAlign: 'center' }}>{successMessage}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="id" style={{ marginBottom: '5px', fontWeight: 'bold' }}>ID:</label>
          <input
            type="number"
            name="id"
            id="id"
            value={formData.id}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="name" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="clinic_location" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Clinic Location:</label>
          <input
            type="text"
            name="clinic_location"
            id="clinic_location"
            value={formData.clinic_location}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="contact" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Contact:</label>
          <input
            type="text"
            name="contact"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="specialization" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Specialization:</label>
          <input
            type="text"
            name="specialization"
            id="specialization"
            value={formData.specialization}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
        >
          Register Doctor
        </button>
      </form>
    </div>
  );
}
