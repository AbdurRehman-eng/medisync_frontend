'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { supabase } from '@/app/supabase/supabaseclient';

// Define the type for the fetched data
interface Medicine {
  medicine_name: string;
  ingredients: string;
  pharmacy_name: string;
  address: string;
  availability: boolean;
}

export default function Outputone() {
  const [query, setQuery] = useState<string>(''); // State to store user input
  const [data, setData] = useState<Medicine[]>([]); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle any errors

  // Debounce function to delay the search until the user stops typing
  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Function to handle search
  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data: fetchedData, error } = await supabase
        .from<Medicine>('main')
        .select('*')
        .or(`medicine_name.ilike.%${query}%,ingredients.ilike.%${query}%`); // Match medicine_name or ingredients

      if (error) {
        setError(error.message);
      } else {
        setData(fetchedData || []); // Set the fetched data
      }
    } catch (e) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Create a debounced version of handleSearch
  const debouncedSearch = debounce(handleSearch, 500); // Wait 500ms after the user stops typing

  // Trigger the search on query change
  useEffect(() => {
    if (query.trim()) {
      debouncedSearch();
    } else {
      setData([]);
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Search Medicine Records</h1>

      {/* Input field */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter medicine name or ingredient"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="p-3 text-lg border border-gray-300 rounded-lg w-2/3 mr-4"
        />
      </div>

      {/* Display error message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Display loading message */}
      {loading && <div className="text-center text-lg">Loading...</div>}

      {/* Display results */}
      {!loading && data.length > 0 && (
        <table className="w-full table-auto border-collapse mt-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">Medicine Name</th>
              <th className="px-4 py-2 border border-gray-300">Ingredients</th>
              <th className="px-4 py-2 border border-gray-300">Pharmacy Name</th>
              <th className="px-4 py-2 border border-gray-300">Address</th>
              <th className="px-4 py-2 border border-gray-300">Availability</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{item.medicine_name}</td>
                <td className="px-4 py-2 border border-gray-300">{item.ingredients}</td>
                <td className="px-4 py-2 border border-gray-300">{item.pharmacy_name}</td>
                <td className="px-4 py-2 border border-gray-300">{item.address}</td>
                <td className="px-4 py-2 border border-gray-300">{item.availability ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No results message */}
      {!loading && data.length === 0 && query.trim() && (
        <div className="text-center text-lg text-gray-500">No records found for "{query}".</div>
      )}
    </div>
  );
}
