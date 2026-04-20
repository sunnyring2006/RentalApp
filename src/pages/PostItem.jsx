import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin } from 'lucide-react';
import { useItems } from '../context/ItemsContext';
import { useAuth } from '../context/AuthContext';
import './PostItem.css';

const PostItem = () => {
  const { addItem } = useItems();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: 'Electronics',
    locationStr: 'Current Location',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default dummy image for newly posted item
    const newItem = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      type: formData.type,
      location: [16.8459, 74.6010], // Default coords for mock map positioning testing
      owner: user ? user.name : 'Anonymous',
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=500&q=80',
    };

    addItem(newItem);
    alert('Item submitted successfully! Awaiting admin approval.');
    navigate('/');
  };

  return (
    <div className="container post-item-page animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      <div className="post-item-header text-center" style={{ marginBottom: '2rem' }}>
        <h2>Post an Item for Rent</h2>
        <p className="text-light">Earn money by renting out things you don't use every day.</p>
      </div>

      <div className="card post-item-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="image-upload-section">
            <div className="upload-box">
              <Camera size={40} color="var(--text-light)" />
              <p>Click to upload images</p>
              <span className="text-small">JPEG, PNG up to 5MB</span>
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Item Title</label>
              <input 
                type="text" 
                className="input-field" 
                name="name" 
                placeholder="e.g., Professional DSLR Camera" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Daily Rental Price (₹)</label>
              <input 
                type="number" 
                className="input-field" 
                name="price" 
                placeholder="0.00" 
                value={formData.price}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="input-field" name="type" value={formData.type} onChange={handleChange}>
                <option>Electronics</option>
                <option>Music</option>
                <option>Outdoors</option>
                <option>Tools</option>
                <option>Vehicle</option>
              </select>
            </div>

            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Description</label>
              <textarea 
                className="input-field" 
                rows="4" 
                name="description" 
                placeholder="Describe your item, its condition, and any rules..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Pick-up Location</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)' }}>
                  <MapPin size={18} color="var(--text-light)" />
                </div>
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  value={formData.locationStr}
                  name="locationStr"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="monetization-notice glass-panel">
            <div className="flex justify-between items-center">
              <span>Platform Commission (Owner Fee)</span>
              <strong style={{ color: 'var(--danger)' }}>15%</strong>
            </div>
            <p className="text-small" style={{ marginTop: '0.5rem', color: 'var(--text-light)' }}>
              We charge a 15% fee on successful rentals to cover insurance and platform costs. Renters pay a minimal 5% convenience fee.
            </p>
          </div>

          <div className="flex justify-center" style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 3rem', fontSize: '1.1rem' }}>
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostItem;
