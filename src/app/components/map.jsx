import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_CENTER = [-74.0242, 40.6941];
const INITIAL_ZOOM = 10.12;

function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null); // Use correct typing for Mapbox GL map reference
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // Use correct typing for the div element

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    // Ensure mapboxgl access token is set
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoYWZpcSIsImEiOiJjbTRweXIyamcwdHFrMmxxc3ZsOHZ6eWs0In0.5o6w8hw9R-z34MiI14KKGA';
    
    // Check if mapContainerRef is available before initializing the map
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: center,
        zoom: zoom,
      });

      mapRef.current.on('move', () => {
        const mapCenter = mapRef.current?.getCenter();
        const mapZoom = mapRef.current?.getZoom();

        if (mapCenter) {
          setCenter([mapCenter.lng, mapCenter.lat]);
        }
        if (mapZoom !== undefined) {
          setZoom(mapZoom);
        }
      });
    }

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <>
      {/* Sidebar with coordinates and zoom */}
      <div className="absolute top-0 left-0 m-3 p-2 bg-gray-800 text-white rounded-md z-10 font-mono">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>

      {/* Map container */}
      <div
        id="map-container"
        ref={mapContainerRef} // Referencing the map container
        className="h-screen w-full bg-gray-200" // Ensuring full height and width
      />
    </>
  );
}

export default Map;
