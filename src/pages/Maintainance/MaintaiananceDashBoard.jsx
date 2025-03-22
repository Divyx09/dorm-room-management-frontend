import React, { useState } from 'react';
import { format } from 'date-fns';

const MaintenanceDashboard = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: 'Leaking Faucet',
      description: 'Bathroom sink faucet is constantly dripping',
      status: 'pending',
      priority: 'medium',
      location: 'Room 203',
      submittedDate: '2024-03-20',
      images: []
    },
    {
      id: 2,
      title: 'AC Not Working',
      description: 'Air conditioning unit making loud noise and not cooling properly',
      status: 'in-progress',
      priority: 'high',
      location: 'Room 203',
      submittedDate: '2024-03-19',
      images: []
    },
    {
      id: 3,
      title: 'Light Bulb Replacement',
      description: 'Common area light bulb needs replacement',
      status: 'resolved',
      priority: 'low',
      location: 'Common Area',
      submittedDate: '2024-03-18',
      images: []
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const filteredRequests = activeFilter === 'all' 
    ? requests 
    : requests.filter(request => request.status === activeFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'var(--status-pending)';
      case 'in-progress': return 'var(--status-in-progress)';
      case 'resolved': return 'var(--status-resolved)';
      default: return 'var(--status-pending)';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="maintenance-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="title-section">
            <h1>Maintenance Requests</h1>
            <p className="text-muted">Track and manage your maintenance requests</p>
          </div>
          <button 
            className="btn-new-request" 
            onClick={() => setShowNewRequestModal(true)}
          >
            <i className="bi bi-plus-lg"></i>
            New Request
          </button>
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-value">
              {requests.filter(r => r.status === 'pending').length}
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {requests.filter(r => r.status === 'in-progress').length}
            </div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {requests.filter(r => r.status === 'resolved').length}
            </div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-pills">
            <button 
              className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Requests
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setActiveFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-pill ${activeFilter === 'resolved' ? 'active' : ''}`}
              onClick={() => setActiveFilter('resolved')}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="requests-grid">
        {filteredRequests.map(request => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <div className="priority-indicator" title={`Priority: ${request.priority}`}>
                {getPriorityIcon(request.priority)}
              </div>
              <div className="status-badge" style={{ backgroundColor: getStatusColor(request.status) }}>
                {request.status}
              </div>
            </div>
            
            <div className="request-content">
              <h3 className="request-title">{request.title}</h3>
              <p className="request-description">{request.description}</p>
              
              <div className="request-meta">
                <div className="meta-item">
                  <i className="bi bi-geo-alt"></i>
                  {request.location}
                </div>
                <div className="meta-item">
                  <i className="bi bi-calendar"></i>
                  {format(new Date(request.submittedDate), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>

            <div className="request-actions">
              <button className="btn-action">
                <i className="bi bi-chat"></i>
                Comment
              </button>
              <button className="btn-action">
                <i className="bi bi-info-circle"></i>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceDashboard;