import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link
          to="/add-reminder"
          className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <span className="text-2xl mb-1">➕</span>
          <span className="text-sm font-medium">Add Medicine</span>
        </Link>
        
        <button
          onClick={() => window.location.reload()}
          className="flex flex-col items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <span className="text-2xl mb-1">🔄</span>
          <span className="text-sm font-medium">Refresh</span>
        </button>
        
        <Link
          to="/profile"
          className="flex flex-col items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <span className="text-2xl mb-1">👤</span>
          <span className="text-sm font-medium">Profile</span>
        </Link>
        
        <button
          onClick={() => alert('Coming soon: Export your medicine data!')}
          className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
        >
          <span className="text-2xl mb-1">📊</span>
          <span className="text-sm font-medium">Export Data</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;