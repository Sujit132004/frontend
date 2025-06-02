import React from 'react';

const StationCard = ({ station, onEdit, onDelete, onViewMap }) => {
  return (
    <div className="border rounded p-4 shadow-md mb-4 bg-white">
      <h3 className="text-xl font-semibold mb-2">{station.name}</h3>
      <p><strong>Location:</strong> Lat: {station.location.latitude}, Lon: {station.location.longitude}</p>
      <p><strong>Power Output:</strong> {station.powerOutput} kW</p>
      <p><strong>Status:</strong> {station.status}</p>
      <p><strong>Connector Type:</strong> {station.connectorType}</p>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onEdit(station)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
        <button onClick={() => onDelete(station._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        <button onClick={() => onViewMap(station)} className="bg-blue-500 text-white px-3 py-1 rounded">View on Map</button>
      </div>
    </div>
  );
};

export default StationCard;
