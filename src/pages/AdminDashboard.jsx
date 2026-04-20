import React, { useState } from 'react';
import { Users, LayoutList, Activity, CheckCircle, XCircle, IndianRupee } from 'lucide-react';
import { useItems } from '../context/ItemsContext';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { getPendingItems, items, updateItemStatus } = useItems();
  const { user } = useAuth();
  
  const pendingItems = getPendingItems();

  const stats = [
    { label: 'Total Users', value: '1,245', icon: <Users size={20} /> },
    { label: 'Active Listings', value: items.filter(i => i.status === 'approved').length.toString(), icon: <LayoutList size={20} /> },
    { label: 'Pending Approvals', value: pendingItems.length.toString(), icon: <Activity size={20} /> },
    { label: 'Platform Revenue', value: '₹3,50,000', icon: <IndianRupee size={20} /> },
  ];

  const handleApprove = (id) => {
    updateItemStatus(id, 'approved');
  };

  const handleReject = (id) => {
    updateItemStatus(id, 'rejected');
  };

  return (
    <div className="container admin-page animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h2>Admin Dashboard</h2>
          <p className="text-light text-small">Welcome, {user.name}. Here's what's happening today.</p>
        </div>
        <div className="badge badge-primary">Platform Mode</div>
      </div>

      <div className="admin-grid">
        <div className="admin-sidebar card">
          <ul className="admin-nav">
            {['Overview', 'Users', 'Listings', 'Approvals', 'Settings'].map(tab => (
              <li key={tab}>
                <button 
                  className={`admin-nav-item ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-content">
          {activeTab === 'Overview' && (
            <>
              <div className="stats-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="stat-card card glass-panel">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-info">
                      <p className="stat-label">{stat.label}</p>
                      <h3 className="stat-value text-gradient">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                  <h3>Pending Approvals (Needs Action)</h3>
                  {pendingItems.length > 0 && <button className="btn btn-outline btn-sm">View All</button>}
                </div>
                
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Owner</th>
                        <th>Price/Day</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingItems.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
                            No pending approvals at the moment. All caught up!
                          </td>
                        </tr>
                      ) : (
                        pendingItems.map(item => (
                          <tr key={item.id}>
                            <td>#{item.id.toString().slice(-4)}</td>
                            <td><strong>{item.name}</strong></td>
                            <td>{item.owner}</td>
                            <td>₹{item.price}</td>
                            <td>
                              <div className="flex gap-2">
                                <button className="icon-btn approve" onClick={() => handleApprove(item.id)} title="Approve">
                                  <CheckCircle size={18} />
                                </button>
                                <button className="icon-btn reject" onClick={() => handleReject(item.id)} title="Reject">
                                  <XCircle size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'Overview' && (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>
              <Activity size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h3>{activeTab} Management</h3>
              <p>This module is under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
