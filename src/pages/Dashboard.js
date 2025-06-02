import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StationForm from '../components/StationForm';
import StationMapModal from '../components/StationMapModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate=useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedStation, setSelectedStation] = useState(null); // For editing
  const [showForm, setShowForm] = useState(false);

  const [mapStation, setMapStation] = useState(null); // For map modal

  const fetchStations = async () => {
    try {
      const res = await axios.get('https://backend-iu4j.onrender.com/api/stations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStations(res.data);
    } catch (err) {
      setError('Failed to fetch stations!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/');
  };




  const handleCreate = () => {
    setSelectedStation(null);
    setShowForm(true);
  };

  const handleEdit = (station) => {
    setSelectedStation(station);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-iu4j.onrender.com/api/stations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStations(); // Refresh
    } catch (err) {
      alert('Error deleting station.');
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedStation) {
        // Update
        await axios.put(
          `https://backend-iu4j.onrender.com/api/stations/${selectedStation._id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create
        await axios.post('https://backend-iu4j.onrender.com/api/stations', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowForm(false);
      fetchStations();
    } catch (err) {
      alert('Error submitting station data.');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
       {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
         Logout
        </button>
      </div>
      <button onClick={handleCreate} className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + Add New Station
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {stations.map((station) => (
          <div key={station._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{station.name}</h2>
            <p>Location: ({station.location.latitude}, {station.location.longitude})</p>
            <p>Power Output: {station.powerOutput} kW</p>
            <p>Connector Type: {station.connectorType}</p>
            <p>Status: {station.status}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(station)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                Edit
              </button>
              <button onClick={() => handleDelete(station._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
              <button onClick={() => setMapStation(station)} className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-800">
                View Map
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <StationForm
              initialData={selectedStation}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {mapStation && (
        <StationMapModal
          station={mapStation}
          onClose={() => setMapStation(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
