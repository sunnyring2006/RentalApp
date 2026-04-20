import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useItems } from '../context/ItemsContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Star, ShieldCheck, User, MessageCircle } from 'lucide-react';
import './ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams();
  const { items } = useItems();
  const { user } = useAuth();
  const [requested, setRequested] = useState(false);
  
  const item = items.find(i => i.id.toString() === id);

  if (!item) {
    return <div className="container" style={{ paddingTop: '5rem' }}><h2>Item not found</h2></div>;
  }

  const renterFee = (item.price * 0.05).toFixed(2);
  const total = (item.price + parseFloat(renterFee)).toFixed(2);

  const handleRequest = () => {
    if (!user) {
      alert("Please Sign In first to request an item.");
      return;
    }
    setRequested(true);
    alert(`Rental request sent to ${item.owner}! You will be notified upon approval.`);
  };

  return (
    <div className="container item-details-page animate-fade-in" style={{ padding: '2rem 1.5rem', maxWidth: '1000px' }}>
      <div className="back-link">
        <Link to="/">&larr; Back to Explore</Link>
      </div>
      
      <div className="details-grid">
        <div className="details-image-container">
          <img src={item.image} alt={item.name} className="details-image card" />
        </div>
        
        <div className="details-info">
          <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>{item.type}</div>
          <h1 className="details-title" style={{ marginTop: '0.25rem' }}>{item.name}</h1>
          
          <div className="flex items-center gap-4 details-meta">
            <div className="flex items-center gap-1">
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <span>{item.rating || 0} (No reviews yet)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{item.distance} away</span>
            </div>
          </div>

          <p className="details-description">{item.description}</p>
          
          <div className="owner-card card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="owner-avatar"><User /></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.owner}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }} className="flex items-center gap-1">
                  <ShieldCheck size={14} color="var(--secondary)" /> Identity Verified
                </div>
              </div>
            </div>
            <button className="btn btn-outline" style={{ padding: '0.4em 0.8em' }}>
              <MessageCircle size={16} /> Contact
            </button>
          </div>

          <div className="checkout-card card">
            <h3>Rental Summary</h3>
            
            <div className="price-breakdown">
              <div className="flex justify-between">
                <span>Daily Rate</span>
                <span>₹{item.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-light">
                <span>Convenience Fee (5%)</span>
                <span>₹{renterFee}</span>
              </div>
              <hr style={{ margin: '1rem 0', borderColor: 'var(--border-color)' }} />
              <div className="flex justify-between total-row">
                <span>Total per day</span>
                <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{total}</span>
              </div>
            </div>
            
            <button 
              className={`btn ${requested ? 'btn-outline' : 'btn-primary'}`} 
              style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}
              onClick={handleRequest}
              disabled={requested}
            >
              {requested ? 'Request Pending...' : 'Request to Rent'}
            </button>
            <p className="text-center text-light" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
              You won't be charged until the owner approves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
