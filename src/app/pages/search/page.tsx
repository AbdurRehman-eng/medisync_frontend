"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { supabase } from "@/app/supabase/supabaseclient";
import { useRouter } from "next/navigation"; // Import useRouter
import { useMedicineContext } from "@/app/context/MedicineContext"; // Import the custom hook

// Define the type for the fetched data
interface Medicine {
  id: string; // Add the id field
  medicine_name: string;
  ingredients: string;
  pharmacy_name: string;
  address: string;
  availability: boolean;
}

export default function Outputone() {
  const [query, setQuery] = useState<string>(""); // State to store user input
  const [data, setData] = useState<Medicine[]>([]); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle any errors

  const { setMedicineId } = useMedicineContext(); // Get setMedicineId from context
  const router = useRouter(); // Hook for routing

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
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data: fetchedData, error } = await supabase
        .from<Medicine>("main")
        .select("*")
        .or(`medicine_name.ilike.%${query}%,ingredients.ilike.%${query}%`); // Corrected interpolation

      if (error) {
        setError(error.message);
      } else {
        setData(fetchedData || []); // Set the fetched data
      }
    } catch (e) {
      setError("An unexpected error occurred.");
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

  // Function to handle card click and set medicineId
  const handleCardClick = (id: string) => {
    setMedicineId(id); // Set the medicineId in the context
    router.push("/pages/medicine_details"); // Redirect to the medicine details page
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-mainBg">
      {/* Header */}
      <div className="h-20 w-full bg-[#213555] fixed top-0 left-0 flex justify-between items-center px-6 z-[1000]">
        <h1 className="text-white text-3xl font-extrabold">Search Medicine Records</h1>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-6 mt-28 w-[50vw]">
        <input
          type="text"
          placeholder="Enter medicine name or ingredient"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="p-3 text-lg border border-gray-300 rounded-lg w-2/3 mr-4"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Loading State */}
      {loading && <div className="text-center text-lg">Loading...</div>}

      {/* Display results in cards */}
      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full px-6">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.id)} // Pass the medicine ID to handleCardClick
              className="cursor-pointer bg-secAccent p-6 rounded-xl shadow-xl transition transform hover:scale-[1.02] w-full max-w-md"
            >
              <h2 className="text-2xl font-semibold text-[#00457c] mb-4">{item.medicine_name}</h2>
              <p className="text-gray-600 mb-4">
                <strong>Ingredients:</strong> {item.ingredients}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Pharmacy:</strong> {item.pharmacy_name}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Address:</strong> {item.address}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Availability:</strong> {item.availability ? "Available" : "Out of Stock"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {!loading && data.length === 0 && query.trim() && (
        <div className="text-center text-lg text-gray-500">No records found for "{query}".</div>
      )}
    </div>
  );
}
