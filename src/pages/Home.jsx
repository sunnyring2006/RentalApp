import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import MapWidget from '../components/MapWidget';
import ItemCard from '../components/ItemCard';
import { useItems } from '../context/ItemsContext';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { getApprovedItems } = useItems();
  const availableItems = getApprovedItems();

  const categories = ['All', 'Electronics', 'Music', 'Outdoors', 'Tools', 'Vehicle'];

  const filteredItems = availableItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title animate-fade-in">
            Rent Anything, <br/><span className="text-gradient">Anywhere Nearby</span>
          </h1>
          <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover and rent everyday items from people in your neighborhood. Start saving money and reducing waste today.
          </p>
          
          <div className="search-bar animate-fade-in glass-panel" style={{ animationDelay: '0.2s' }}>
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="What do you need to rent today?" 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary search-btn">Search</button>
          </div>
        </div>
        <div className="hero-bg-shapes"></div>
      </section>

      <section className="main-content container flex gap-6" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        
        <div className="map-section animate-fade-in" style={{ animationDelay: '0.3s', flex: '1' }}>
          <h3 style={{ marginBottom: '1rem' }} className="section-heading">Items near you</h3>
          <MapWidget items={filteredItems} />
        </div>

        <div className="listings-section animate-fade-in" style={{ animationDelay: '0.4s', flex: '1.5' }}>
          
          <div className="filters-row flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <div className="categories flex gap-2" style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="btn btn-outline" style={{ display: 'none' }}>
              <Filter size={16} /> Filters
            </button>
          </div>

          <div className="items-grid grid grid-cols-2 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))
            ) : (
              <div className="empty-state">
                <p>No items found for this search/category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
