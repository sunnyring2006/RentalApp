import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === 'admin@rental.com' && password === 'admin') {
      setUser({ role: 'admin', name: 'Admin', email });
      return true;
    } else if (email === 'user@rental.com' && password === 'password123') {
      setUser({ role: 'user', name: 'John Doe', email });
      return true;
    }
    return false; // Invalid credentials
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
