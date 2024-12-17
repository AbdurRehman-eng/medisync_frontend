'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';

interface MedicineData {
  medicine_name: string;
  ingredients: string;
  pharmacy_name: string;
  address: string;
  availability: boolean;
}

export default function Inpu() {
  const [formData, setFormData] = useState<MedicineData>({
    medicine_name: '',
    ingredients: '',
    pharmacy_name: '',
    address: '',
    availability: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission to insert data
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure form data is valid
    if (!formData.medicine_name || !formData.ingredients || !formData.pharmacy_name || !formData.address) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Get the maximum id from the database
      const { data: maxIdData, error: maxIdError } = await supabase
        .from('main')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (maxIdError) throw new Error('Error fetching max ID');

      const nextId = (maxIdData?.[0]?.id || 0) + 1;

      // Insert data with the new ID
      const { error: insertError } = await supabase.from('main').insert([{ id: nextId, ...formData }]);

      if (insertError) throw new Error(insertError.message);

      setSuccessMessage('Data added successfully!');
      setError('');

      // Reset form fields
      setFormData({
        medicine_name: '',
        ingredients: '',
        pharmacy_name: '',
        address: '',
        availability: false,
      });
    } catch (err: any) {
      setError(`Error: ${err.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-green-600 mb-6 text-center">Add Medicine</h1>

        {/* Display error message */}
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        {/* Display success message */}
        {successMessage && <div className="text-green-600 mb-4 text-center">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Medicine Name:</label>
            <input
              type="text"
              name="medicine_name"
              value={formData.medicine_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter medicine name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ingredients:</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter ingredients"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Pharmacy Name:</label>
            <input
              type="text"
              name="pharmacy_name"
              value={formData.pharmacy_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter pharmacy name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter pharmacy address"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="ml-2 text-gray-700">Available in stock</label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
}
