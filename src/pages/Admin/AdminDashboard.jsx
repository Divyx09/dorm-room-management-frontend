import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Mock data - replace with actual API calls
  const occupancyData = [
    { floor: '1st Floor', total: 20, occupied: 18 },
    { floor: '2nd Floor', total: 20, occupied: 16 },
    { floor: '3rd Floor', total: 20, occupied: 19 },
    { floor: '4th Floor', total: 20, occupied: 15 }
  ];

  const maintenanceData = [
    { status: 'Pending', value: 8, color: '#ffd700' },
    { status: 'In Progress', value: 5, color: '#1e90ff' },
    { status: 'Resolved', value: 12, color: '#32cd32' }
  ];

  const taskCompletionData = [
    { week: 'Week 1', completion: 85 },
    { week: 'Week 2', completion: 78 },
    { week: 'Week 3', completion: 92 },
    { week: 'Week 4', completion: 88 }
  ];

  return (
    <div className="admin-dashboard d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white">
        <div className="sidebar-header p-3">
          <h4 className="mb-0">Admin Panel</h4>
        </div>
        <div className="sidebar-menu">
          <Link to="/admin" className="menu-item active">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>
          <Link to="/admin/students" className="menu-item">
            <i className="bi bi-people me-2"></i>
            Students
          </Link>
          <Link to="/admin/maintenance" className="menu-item">
            <i className="bi bi-tools me-2"></i>
            Maintenance
          </Link>
          <Link to="/admin/tasks" className="menu-item">
            <i className="bi bi-list-check me-2"></i>
            Tasks
          </Link>
          <Link to="/admin/expenses" className="menu-item">
            <i className="bi bi-cash-stack me-2"></i>
            Expenses
          </Link>
          <Link to="/admin/settings" className="menu-item">
            <i className="bi bi-gear me-2"></i>
            Settings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 bg-light">
        <div className="container-fluid py-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-0">Admin Dashboard</h1>
              <p className="text-muted mb-0">Overview and Analytics</p>
            </div>
            <div className="period-selector">
              <select 
                className="form-select"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-muted mb-2">Total Students</h6>
                      <h3 className="mb-0">248</h3>
                    </div>
                    <div className="stat-icon bg-primary-subtle">
                      <i className="bi bi-people"></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-success">
                      <i className="bi bi-arrow-up"></i> 4.8%
                    </span>
                    <span className="text-muted ms-2">vs last period</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-muted mb-2">Maintenance Requests</h6>
                      <h3 className="mb-0">25</h3>
                    </div>
                    <div className="stat-icon bg-warning-subtle">
                      <i className="bi bi-tools"></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-danger">
                      <i className="bi bi-arrow-up"></i> 12.5%
                    </span>
                    <span className="text-muted ms-2">vs last period</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-muted mb-2">Task Completion</h6>
                      <h3 className="mb-0">85.7%</h3>
                    </div>
                    <div className="stat-icon bg-success-subtle">
                      <i className="bi bi-check-circle"></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-success">
                      <i className="bi bi-arrow-up"></i> 3.2%
                    </span>
                    <span className="text-muted ms-2">vs last period</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="text-muted mb-2">Occupancy Rate</h6>
                      <h3 className="mb-0">92.5%</h3>
                    </div>
                    <div className="stat-icon bg-info-subtle">
                      <i className="bi bi-house-door"></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-success">
                      <i className="bi bi-arrow-up"></i> 1.2%
                    </span>
                    <span className="text-muted ms-2">vs last period</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Occupancy by Floor</h5>
                </div>
                <div className="card-body">
                  <BarChart width={700} height={300} data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="floor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" name="Total Rooms" />
                    <Bar dataKey="occupied" fill="#82ca9d" name="Occupied" />
                  </BarChart>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Maintenance Status</h5>
                </div>
                <div className="card-body">
                  <PieChart width={300} height={300}>
                    <Pie
                      data={maintenanceData}
                      dataKey="value"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {maintenanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Recent Activity</h5>
              <button className="btn btn-sm btn-primary">View All</button>
            </div>
            <div className="card-body">
              <div className="activity-list">
                <div className="activity-item d-flex align-items-center py-3 border-bottom">
                  <div className="activity-icon bg-primary-subtle rounded-circle p-2 me-3">
                    <i className="bi bi-person-plus"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">New student check-in</h6>
                    <p className="text-muted mb-0">Room 304 - John Smith</p>
                  </div>
                  <small className="text-muted">2 hours ago</small>
                </div>
                <div className="activity-item d-flex align-items-center py-3 border-bottom">
                  <div className="activity-icon bg-warning-subtle rounded-circle p-2 me-3">
                    <i className="bi bi-tools"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Maintenance request resolved</h6>
                    <p className="text-muted mb-0">AC repair in Room 201</p>
                  </div>
                  <small className="text-muted">4 hours ago</small>
                </div>
                <div className="activity-item d-flex align-items-center py-3">
                  <div className="activity-icon bg-success-subtle rounded-circle p-2 me-3">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">Weekly cleaning completed</h6>
                    <p className="text-muted mb-0">2nd Floor common areas</p>
                  </div>
                  <small className="text-muted">6 hours ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;