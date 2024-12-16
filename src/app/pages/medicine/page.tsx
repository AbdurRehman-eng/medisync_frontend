'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for client-side routing
import { supabase } from '@/app/supabase/supabaseclient';

interface MedicineData {
  medicine_name: string;
  ingredients: string;
}

export default function MedicineDetails() {
  const [medicine, setMedicine] = useState<MedicineData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { id } = router.query || {};  // Default to an empty object if router.query is undefined

  useEffect(() => {
    if (id) {
      const fetchMedicine = async () => {
        try {
          const { data, error } = await supabase
            .from('main') // Use the "main" table
            .select('medicine_name, ingredients') // Select the relevant columns
            .eq('id', id) // Query by id
            .single(); // Since the id is unique, we only need a single record

          if (error) {
            setError('Failed to load medicine details');
          } else {
            setMedicine(data);
          }
        } catch (err) {
          setError('An unexpected error occurred.');
        }
      };

      fetchMedicine();
    }
  }, [id]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {medicine ? (
        <div>
          <h1>{medicine.medicine_name}</h1>
          <p>
            <strong>Ingredients:</strong> {medicine.ingredients}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
