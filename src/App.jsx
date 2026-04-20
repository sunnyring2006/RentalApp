import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ItemsProvider } from './context/ItemsContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostItem from './pages/PostItem';
import ItemDetails from './pages/ItemDetails';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import 'leaflet/dist/leaflet.css'; // Essential for map rendering

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />; 
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ItemsProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/item/:id" element={<ItemDetails />} />
                
                <Route path="/post" element={
                  <ProtectedRoute>
                    <PostItem />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </ItemsProvider>
    </AuthProvider>
  );
}

export default App;
