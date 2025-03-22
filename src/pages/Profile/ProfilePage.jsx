import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    major: 'Computer Science',
    year: 'Junior',
    preferences: {
      sleepSchedule: {
        weekdayBedtime: "22:00",
        weekdayWakeup: "07:00"
      },
      cleanliness: 4,
      noise: 3,
      guestsFrequency: 2
    }
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container py-4">
      <div className="profile-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">My Profile</h1>
          <p className="text-muted mb-0">Manage your personal information and preferences</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleEditToggle}
        >
          <i className="bi bi-pencil me-2"></i>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="row g-4">
        {/* Personal Information Card */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="profile-photo mb-3">
                <img
                  src="/images/avatars/default.jpg"
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              </div>
              <h5 className="card-title mb-1">{`${profile.firstName} ${profile.lastName}`}</h5>
              <p className="text-muted mb-3">{`${profile.major} • ${profile.year}`}</p>
              <div className="personal-info text-start">
                <div className="info-item mb-2">
                  <i className="bi bi-envelope me-2"></i>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  ) : profile.email}
                </div>
                <div className="info-item mb-2">
                  <i className="bi bi-telephone me-2"></i>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  ) : profile.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roommate Preferences Card */}
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Roommate Preferences</h5>
            </div>
            <div className="card-body">
              <div className="preferences-grid">
                <div className="preference-item mb-3">
                  <label className="form-label">Sleep Schedule</label>
                  <div className="d-flex gap-3">
                    <div className="time-input">
                      <small>Bedtime</small>
                      <input
                        type="time"
                        className="form-control"
                        value={profile.preferences.sleepSchedule.weekdayBedtime}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="time-input">
                      <small>Wake up</small>
                      <input
                        type="time"
                        className="form-control"
                        value={profile.preferences.sleepSchedule.weekdayWakeup}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="preference-item mb-3">
                  <label className="form-label">Cleanliness Level</label>
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="5"
                    value={profile.preferences.cleanliness}
                    disabled={!isEditing}
                  />
                  <div className="d-flex justify-content-between">
                    <small>Relaxed</small>
                    <small>Very Neat</small>
                  </div>
                </div>

                <div className="preference-item mb-3">
                  <label className="form-label">Noise Tolerance</label>
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="5"
                    value={profile.preferences.noise}
                    disabled={!isEditing}
                  />
                  <div className="d-flex justify-content-between">
                    <small>Silent</small>
                    <small>Social</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks & Expenses Summary */}
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Activity Summary</h5>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <h6 className="mb-3">Assigned Tasks</h6>
                  <div className="list-group">
                    <Link to="/tasks" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      Clean Common Area
                      <span className="badge bg-warning">Due Tomorrow</span>
                    </Link>
                    <Link to="/tasks" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      Take Out Trash
                      <span className="badge bg-success">Completed</span>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <h6 className="mb-3">Recent Expenses</h6>
                  <div className="list-group">
                    <Link to="/expenses" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      Utilities - March
                      <span className="badge bg-primary">$45.00</span>
                    </Link>
                    <Link to="/expenses" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      Groceries
                      <span className="badge bg-primary">$32.50</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;