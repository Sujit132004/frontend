import React, { useState, useEffect } from 'react';

const StationForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [powerOutput, setPowerOutput] = useState('');
  const [status, setStatus] = useState('Active');
  const [connectorType, setConnectorType] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLatitude(initialData.location.latitude);
      setLongitude(initialData.location.longitude);
      setPowerOutput(initialData.powerOutput);
      setStatus(initialData.status);
      setConnectorType(initialData.connectorType);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      location: { latitude, longitude },
      powerOutput,
      status,
      connectorType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit' : 'Add'} Station</h2>

      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
      <input type="number" placeholder="Latitude" value={latitude} onChange={e => setLatitude(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
      <input type="number" placeholder="Longitude" value={longitude} onChange={e => setLongitude(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
      <input type="number" placeholder="Power Output (kW)" value={powerOutput} onChange={e => setPowerOutput(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
      
      <input type="text" placeholder="Connector Type" value={connectorType} onChange={e => setConnectorType(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
      
      <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 mb-3 border rounded">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {initialData ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StationForm;
