import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/app/supabase/supabaseclient';

interface MedicineData {
  id: number;
  name: string;
  description: string;
  chemical_formula: string;
  image_url: string;
}

export default function MedicineDetails() {
  const [medicine, setMedicine] = useState<MedicineData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Track if we're on the client side
  const router = useRouter();
  const { id } = router.query; // Get medicine ID from the query parameters

  useEffect(() => {
    // Set isClient to true after the component is mounted on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (id) {
      const fetchMedicine = async () => {
        try {
          const { data, error } = await supabase
            .from('medicine')
            .select('*')
            .eq('id', id)
            .single();

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

  if (!isClient) {
    return <div>Loading...</div>; // Show a loading message until the component is mounted on the client
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Medicine Details</h1>

      {/* Error Message */}
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</div>}

      {/* Medicine Information */}
      {medicine && (
        <div>
          <h2>{medicine.name}</h2>
          <img
            src={medicine.image_url}
            alt={`${medicine.name} image`}
            style={{ width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '10px' }}
          />
          <p>
            <strong>Description:</strong> {medicine.description}
          </p>
          <p>
            <strong>Chemical Formula:</strong> {medicine.chemical_formula}
          </p>
        </div>
      )}
    </div>
  );
}
