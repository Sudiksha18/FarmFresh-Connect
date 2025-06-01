import { useUserLocation } from "@/hooks/useUserLocation";

const farmers = [
  { id: 1, name: "Farmer A", latitude: 17.385, longitude: 78.4867 },
  { id: 2, name: "Farmer B", latitude: 18.5204, longitude: 73.8567 },
];

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (val: number) => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const NearbyFarmers = () => {
  const location = useUserLocation();

  const nearbyFarmers = location
    ? farmers.filter((farmer) => {
        const distance = getDistance(
          location.latitude,
          location.longitude,
          farmer.latitude,
          farmer.longitude
        );
        return distance <= 10;
      })
    : [];

  return (
    <div>
      <h2 className="text-xl font-bold">Nearby Farmers</h2>
      <ul>
        {nearbyFarmers.map((f) => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyFarmers;
