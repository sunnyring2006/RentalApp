import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  return (
    <div className="card item-card animate-fade-in">
      <div className="item-image-wrapper">
        <img src={item.image} alt={item.name} className="item-image" />
        <div className="item-badge type-badge">{item.type}</div>
      </div>
      <div className="item-content">
        <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
          <h3 className="item-title">{item.name}</h3>
          <div className="item-rating">
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span>{item.rating}</span>
          </div>
        </div>
        
        <p className="item-owner">by {item.owner}</p>
        
        <div className="item-location flex items-center gap-2">
          <MapPin size={14} />
          <span>{item.distance} away</span>
        </div>
        
        <div className="item-footer flex justify-between items-center">
          <div className="item-price">
            <span className="price-value">₹{item.price}</span>
            <span className="price-unit">/day</span>
          </div>
          <Link to={`/item/${item.id}`} className="btn btn-outline btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
