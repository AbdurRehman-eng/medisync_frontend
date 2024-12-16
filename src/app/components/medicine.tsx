'use client';

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
  const router = useRouter();
  const { id } = router.query; // Get medicine ID from the query parameters
  const [mapLoaded, setMapLoaded] = useState(false);

  // Fetch medicine details from Supabase
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

  // Load Google Maps API Script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (typeof window !== 'undefined' && !mapLoaded) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        setMapLoaded(true);
      }
    };

    window.initMap = () => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 12,
      });

      const service = new google.maps.places.PlacesService(map);
      const request = {
        query: 'pharmacy',
        fields: ['name', 'geometry'],
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            const marker = new google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name,
            });
          });
        }
      });
    };

    loadGoogleMaps();
  }, [mapLoaded]);

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

      {/* Google Maps */}
      <div style={{ marginTop: '20px' }}>
        <h2>Nearest Pharmacies</h2>
        <div id="map" style={{ width: '100%', height: '400px', borderRadius: '10px' }}></div>
      </div>
    </div>
  );
}
