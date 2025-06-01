import LocationFetcher from "./LocationFetcher.tsx";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <LocationFetcher />
    </div>
  );
};

export default Dashboard;
