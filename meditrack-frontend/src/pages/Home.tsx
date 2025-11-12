import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to MediTrack
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Never miss your medication again. MediTrack helps you manage your medicine schedule 
            with personalized reminders and tracking features.
          </p>
          
          <div className="space-x-4">
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
            <p className="text-gray-600">Get timely notifications for your medications</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your medication adherence</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Manage Multiple Meds</h3>
            <p className="text-gray-600">Organize all your medications in one place</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;