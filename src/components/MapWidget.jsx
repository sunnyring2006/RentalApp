import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './MapWidget.css';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// A component to draw a circle for 5km radius
const LocationCircle = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    const circle = L.circle(center, {
      color: '#4F46E5',
      fillColor: '#4F46E5',
      fillOpacity: 0.1,
      radius: 5000 // 5km
    }).addTo(map);
    return () => {
      map.removeLayer(circle);
    };
  }, [map, center]);
  return null;
};

const MapWidget = ({ items, userLocation = [16.8459, 74.6010] }) => {
  const navigate = useNavigate();

  return (
    <div className="map-wrapper card">
      <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationCircle center={userLocation} />
        
        {/* User Location Marker (different color if possible or just standard) */}
        
        {items.map(item => (
          <Marker position={item.location} key={item.id}>
            <Popup className="custom-popup">
              <div className="popup-content">
                <img src={item.image} alt={item.name} className="popup-img" />
                <div className="popup-info">
                  <h4>{item.name}</h4>
                  <p className="popup-price">₹{item.price} <span>/day</span></p>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '4px 8px', fontSize: '12px', marginTop: '8px' }}
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="map-overlay-info glass-panel">
        <p>Showing items within <strong>5 km</strong> radius</p>
      </div>
    </div>
  );
};

export default MapWidget;
