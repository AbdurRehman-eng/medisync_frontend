"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/supabase/supabaseclient";

type MedicineRecord = {
  id: number;
  medicine_name: string;
  ingredients: string;
  pharmacy_name: string;
  address: string;
  availability: boolean;
};

export default function Output() {
  const [data, setData] = useState<MedicineRecord[]>([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle any errors

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData, error } = await supabase
        .from("main") // The name of the table
        .select("*"); // Select all columns

      if (error) {
        setError(error.message); // Handle error
      } else {
        setData(fetchedData || []); // Set the fetched data
      }
      setLoading(false); // Stop loading
    };

    fetchData(); // Call the fetch function on component mount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{`Error: ${error}`}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Medicine Records</h1>
      <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-lg bg-white p-4">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-gray-600 font-medium">ID</th>
              <th className="px-4 py-2 border-b text-gray-600 font-medium">Medicine Name</th>
              <th className="px-4 py-2 border-b text-gray-600 font-medium">Ingredients</th>
              <th className="px-4 py-2 border-b text-gray-600 font-medium">Pharmacy Name</th>
              <th className="px-4 py-2 border-b text-gray-600 font-medium">Address</th>
              <th className="px-4 py-2 border-b text-gray-600 font-medium">Availability</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-gray-700">{item.id}</td>
                <td className="px-4 py-2 border-b text-gray-700">{item.medicine_name}</td>
                <td className="px-4 py-2 border-b text-gray-700">{item.ingredients}</td>
                <td className="px-4 py-2 border-b text-gray-700">{item.pharmacy_name}</td>
                <td className="px-4 py-2 border-b text-gray-700">{item.address}</td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {item.availability ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
