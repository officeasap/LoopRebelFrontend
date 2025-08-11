// src/pages/withdraw/index.tsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../lib/api'; // adjust path if needed

const WithdrawPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        // TODO: Replace 'user-id' with actual logged-in user ID from your auth context or state
        const userId = 'user-id';
        const profileData = await getUserProfile(userId);
        setProfile(profileData);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      }
    }
    loadProfile();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Withdraw Page</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {profile ? (
        <div>
          <h2>User Profile</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
          {/* Add withdrawal UI here */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default WithdrawPage;
