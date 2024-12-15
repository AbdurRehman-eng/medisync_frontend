"use client";

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
    if (!formData.id || !formData.name || !formData.address || !formData.email || !formData.phone) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase.from('pharmacist').insert([formData]);

      if (error) {
        setError(`Error: ${error.message}`);
        setSuccessMessage('');
      } else {
        setSuccessMessage('Pharmacist registered successfully!');
        setError('');

        // Reset form
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Register Pharmacist</h1>

      {/* Display error message */}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {/* Display success message */}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="id" style={{ fontWeight: 'bold' }}>ID:</label>
          <input
            type="number"
            name="id"
            id="id"
            value={formData.id}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="name" style={{ fontWeight: 'bold' }}>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="address" style={{ fontWeight: 'bold' }}>Address:</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="phone" style={{ fontWeight: 'bold' }}>Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Register Pharmacist
        </button>
      </form>
    </div>
  );
}
