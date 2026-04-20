import React, { createContext, useState, useContext } from 'react';
import { mockItems } from '../data/mockData';

const ItemsContext = createContext();

export const useItems = () => useContext(ItemsContext);

export const ItemsProvider = ({ children }) => {
  // Initialize with our mock data, setting all their statuses to 'approved'
  const [items, setItems] = useState(mockItems.map(i => ({ ...i, status: 'approved' })));

  // Add a new item as pending
  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: Date.now(),
      status: 'pending', // Requires admin approval
      rating: 0,
      distance: 'Your location', // Stub for newly added
    };
    setItems(prev => [...prev, newItem]);
  };

  // Update Item Status (e.g., from 'pending' to 'approved', or to 'requested')
  const updateItemStatus = (id, newStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const getApprovedItems = () => items.filter(item => item.status === 'approved');
  const getPendingItems = () => items.filter(item => item.status === 'pending');

  return (
    <ItemsContext.Provider value={{ 
      items, 
      addItem, 
      updateItemStatus, 
      getApprovedItems,
      getPendingItems
    }}>
      {children}
    </ItemsContext.Provider>
  );
};
