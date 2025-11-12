import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <p className="text-gray-900 text-lg">{user?.name}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <p className="text-gray-900 text-lg">{user?.email}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <p className="text-gray-900 text-lg capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Account Information</h3>
          <p className="text-blue-700">
            Your account is active and ready to use. You can manage your medicine reminders 
            from the dashboard and receive notifications for your scheduled medications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;