import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card card glass-panel">
        <h2 className="text-center" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Welcome Back</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@rental.com or admin@rental.com"
              required 
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
            Sign In
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="text-small text-light"><strong>Demo Credentials:</strong></p>
          <div className="credentials-box">
            <p><strong>Admin:</strong> admin@rental.com / admin</p>
            <p><strong>User:</strong> user@rental.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
