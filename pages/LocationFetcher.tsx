import { useEffect, useState } from "react";


type Location = { lat: number; lng: number };

const LocationFetcher = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setError(null);
      },
      () => {
        setError("Location access denied or unavailable.");
        setLocation(null);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Your Location</h2>
      {error ? (
        <div className="text-red-500">
          {error}
          <button
            onClick={requestLocation}
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded"
          >
            Try Again
          </button>
        </div>
      ) : location ? (
        <div className="text-green-700">
          Latitude: {location.lat}
          <br />
          Longitude: {location.lng}
        </div>
      ) : (
        <div className="text-gray-500">Fetching location...</div>
      )}
    </div>
  );
};

export default LocationFetcher;
