import { useMedicineContext } from "@/app/context/MedicineContext"; // Import context hook
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase/supabaseclient"; // Assuming you have Supabase client set up

const MedicineDetails = () => {
  const { medicineId } = useMedicineContext(); // Access the medicineId from context
  const [medicineDetails, setMedicineDetails] = useState<any>(null);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      if (!medicineId) return;

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
    };

    fetchMedicineDetails();
  }, [medicineId]);

  if (!medicineDetails) return <p>Loading...</p>;

  return (
    <div>
      <h1>{medicineDetails.medicine_name}</h1>
      <p><strong>Ingredients:</strong> {medicineDetails.ingredients}</p>
      <p><strong>Availability:</strong> {medicineDetails.availability}</p>
      <p><strong>Address:</strong> {medicineDetails.address}</p>
      <p><strong>Pharmacy Name:</strong> {medicineDetails.pharmacy_name}</p>
    </div>
  );
};

export default MedicineDetails;
