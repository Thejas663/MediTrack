import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reminderAPI } from '../utils/api';

interface Reminder {
  _id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  times: string[];
  notes?: string;
  isActive: boolean;
}

const Dashboard: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReminders = async () => {
    try {
      const response = await reminderAPI.getReminders({
        search,
        sortBy,
        page: currentPage,
        limit: 10
      });
      setReminders(response.data.reminders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [search, sortBy, currentPage]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      try {
        await reminderAPI.deleteReminder(id);
        fetchReminders();
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medicine Reminders</h1>
        <Link
          to="/add-reminder"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Reminder
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="createdAt">Sort by Date Created</option>
          <option value="medicineName">Sort by Medicine Name</option>
          <option value="startDate">Sort by Start Date</option>
        </select>
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No reminders found.</p>
          <Link
            to="/add-reminder"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Your First Reminder
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {reminders.map((reminder) => (
              <div key={reminder._id} className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      {reminder.medicineName}
                    </h3>
                    <p className="text-gray-600 mb-1">Dosage: {reminder.dosage}</p>
                    <p className="text-gray-600 mb-1">Frequency: {reminder.frequency}</p>
                    <p className="text-gray-600 mb-1">
                      Times: {reminder.times.join(', ')}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Duration: {new Date(reminder.startDate).toLocaleDateString()} - {new Date(reminder.endDate).toLocaleDateString()}
                    </p>
                    {reminder.notes && (
                      <p className="text-gray-600 mt-2">Notes: {reminder.notes}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(reminder._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;