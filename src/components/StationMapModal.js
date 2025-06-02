import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const StationMapModal = ({ station, onClose }) => {
  if (!station) return null;

  const { latitude, longitude } = station.location;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-[90vw] max-w-2xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-600 font-bold text-lg">X</button>
        <h2 className="text-xl font-bold mb-2">{station.name} Location</h2>
        <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              {station.name}<br />{station.connectorType}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default StationMapModal;
