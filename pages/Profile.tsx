import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Farmer {
  id: string;
  name: string;
  email: string;
  location: string;
  farmLocation: string;
  farmDescription: string;
  phoneNumber: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

type User = Farmer | Customer;

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get<User>('/api/user/profile');
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {'location' in user && (
            <>
              <p><strong>Location:</strong> {user.location}</p>
              <p><strong>Farm Location:</strong> {user.farmLocation}</p>
              <p><strong>Farm Description:</strong> {user.farmDescription}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;