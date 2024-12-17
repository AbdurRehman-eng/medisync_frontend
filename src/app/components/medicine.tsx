import { useMedicineContext } from "@/app/context/MedicineContext";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase/supabaseclient"; // Assuming you have Supabase client set up

const MedicineDetails = () => {
  const { medicineId } = useMedicineContext(); // Access the medicineId from context
  const [medicineDetails, setMedicineDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      if (!medicineId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("main") // Assuming 'main' is the table name
        .select("*")
        .eq("id", medicineId)
        .single();

      if (error) {
        console.error("Error fetching medicine details:", error.message);
      } else {
        setMedicineDetails(data);
      }
      setLoading(false);
    };

    fetchMedicineDetails();
  }, [medicineId]);

  if (loading) return <div className="text-center py-6 text-xl">Loading...</div>;

  if (!medicineDetails) {
    return <div className="text-center py-6 text-xl text-red-500">Medicine details not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-[#00457c] mb-4">
          {medicineDetails.medicine_name}
        </h1>
        
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="font-semibold text-[#213555]">Ingredients:</strong>{" "}
            {medicineDetails.ingredients}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-[#213555]">Pharmacy:</strong>{" "}
            {medicineDetails.pharmacy_name}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-[#213555]">Address:</strong>{" "}
            {medicineDetails.address}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-[#213555]">Availability:</strong>{" "}
            {medicineDetails.availability ? (
              <span className="text-green-500">Available</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()} // Button to go back to previous page
            className="px-6 py-2 text-white bg-[#213555] rounded-lg shadow-md hover:bg-[#00457c] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
