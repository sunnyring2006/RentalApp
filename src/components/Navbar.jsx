import { Link, useNavigate } from 'react-router-dom';
import { MapPin, PlusCircle, ShieldAlert, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <MapPin size={24} color="white" />
          </div>
          <span className="text-gradient">LendLocals</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Explore</Link>
          <Link to="/post" className="nav-link">
            <PlusCircle size={18} />
            Post Item
          </Link>
          
          {user?.role === 'admin' && (
            <>
              <div className="nav-divider"></div>
              <Link to="/admin" className="nav-link admin-link">
                <ShieldAlert size={18} />
                Admin Dashboard
              </Link>
            </>
          )}

          <div className="nav-divider"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="user-greeting" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                Hi, {user.name}
              </span>
              <button className="btn btn-outline btn-avatar" onClick={handleLogout}>
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-avatar">
              <User size={18} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
