'use client';

import { useState } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';

interface Medicine {
  id: number;
  medicine_name: string;
  ingredients: string;
  address: string;
  availability: boolean;
}

export default function SearchByPharmacy() {
  const [query, setQuery] = useState<string>(''); // Pharmacy name input
  const [data, setData] = useState<Medicine[]>([]); // Fetched medicines
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [changes, setChanges] = useState<Record<number, boolean>>({}); // Track availability changes

  // Search functionality
  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a pharmacy name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: fetchedData, error } = await supabase
        .from('main')
        .select('id, medicine_name, ingredients, address, availability')
        .ilike('pharmacy_name', `%${query}%`);

      if (error) {
        setError(error.message);
      } else {
        setData(fetchedData || []);
      }
    } catch (e) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Handle availability toggle
  const handleAvailabilityChange = (id: number, newAvailability: boolean) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [id]: newAvailability,
    }));
  };

  // Commit changes to database
  const handleCommitChanges = async () => {
    setLoading(true);
    setError(null);

    try {
      for (const [id, availability] of Object.entries(changes)) {
        const { error } = await supabase
          .from('main')
          .update({ availability })
          .eq('id', Number(id));

        if (error) {
          setError(`Failed to update availability for ID ${id}`);
          break;
        }
      }

      // Refetch data after committing changes
      setChanges({});
      handleSearch();
    } catch (e) {
      setError('An unexpected error occurred while committing changes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Search Medicines by Pharmacy
      </h1>

      {/* Search Input */}
      <div className="mb-6 flex w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter pharmacy name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="mb-6 text-gray-600">Loading...</div>
      )}

      {/* Results Table */}
      {!loading && data.length > 0 && (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="px-4 py-2 border">Medicine Name</th>
                <th className="px-4 py-2 border">Ingredients</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Availability</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.medicine_name}</td>
                  <td className="px-4 py-2 border">{item.ingredients}</td>
                  <td className="px-4 py-2 border">{item.address}</td>
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      checked={changes[item.id] ?? item.availability}
                      onChange={(e) =>
                        handleAvailabilityChange(item.id, e.target.checked)
                      }
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Commit Changes Button */}
      {Object.keys(changes).length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleCommitChanges}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Commit Changes
          </button>
        </div>
      )}

      {/* No Results Message */}
      {!loading && data.length === 0 && query.trim() && (
        <div className="mt-6 text-gray-600">
          No records found for pharmacy "{query}".
        </div>
      )}
    </div>
  );
}
