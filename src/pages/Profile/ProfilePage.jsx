import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    major: "",
    year: "",
    preferences: {
      sleepSchedule: {
        weekdayBedtime: "22:00",
        weekdayWakeup: "07:00",
      },
      cleanliness: 3,
      noise: 3,
      guestsFrequency: 2,
    },
  });

  useEffect(() => {
    if (user) {
      // Split the name into first and last name
      const [firstName = "", lastName = ""] = (user.name || "").split(" ");
      setProfile((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || "",
        // Keep other fields from local state if they exist
      }));
    }
  }, [user]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      const updatedUser = {
        ...user,
        name: `${profile.firstName} ${profile.lastName}`,
        email: profile.email,
        preferences: profile.preferences,
      };
      updateUser(updatedUser);
    }
    setIsEditing(!isEditing);
  };

  const handlePreferenceChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  const handleSleepScheduleChange = (type, value) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        sleepSchedule: {
          ...prev.preferences.sleepSchedule,
          [type]: value,
        },
      },
    }));
  };

  return (
    <div className='container py-4'>
      <div className='profile-header d-flex justify-content-between align-items-center mb-4'>
        <div>
          <h1 className='h3 mb-0'>My Profile</h1>
          <p className='text-muted mb-0'>
            Manage your personal information and preferences
          </p>
        </div>
        <button
          className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
          onClick={handleEditToggle}
        >
          <i
            className={`bi ${isEditing ? "bi-check-lg" : "bi-pencil"} me-2`}
          ></i>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className='row g-4'>
        {/* Personal Information Card */}
        <div className='col-lg-4'>
          <div className='card h-100'>
            <div className='card-body'>
              <div className='text-center mb-4'>
                <div className='profile-photo mb-3'>
                  <img
                    src={user?.avatar || "/images/avatars/default.jpg"}
                    alt='Profile'
                    className='rounded-circle'
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h5 className='card-title mb-1'>{`${profile.firstName} ${profile.lastName}`}</h5>
                <p className='text-muted mb-3'>{`${
                  profile.major || "Not Set"
                } • ${profile.year || "Not Set"}`}</p>
              </div>

              <div className='personal-info'>
                <div className='mb-3'>
                  <label className='form-label'>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Last Name</label>
                  <input
                    type='text'
                    className='form-control'
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='tel'
                    className='form-control'
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roommate Preferences Card */}
        <div className='col-lg-8'>
          <div className='card h-100'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Roommate Preferences</h5>
            </div>
            <div className='card-body'>
              <div className='preferences-grid'>
                <div className='preference-item mb-4'>
                  <label className='form-label'>Sleep Schedule</label>
                  <div className='d-flex gap-3'>
                    <div className='time-input flex-grow-1'>
                      <small>Bedtime</small>
                      <input
                        type='time'
                        className='form-control'
                        value={profile.preferences.sleepSchedule.weekdayBedtime}
                        onChange={(e) =>
                          handleSleepScheduleChange(
                            "weekdayBedtime",
                            e.target.value,
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className='time-input flex-grow-1'>
                      <small>Wake up</small>
                      <input
                        type='time'
                        className='form-control'
                        value={profile.preferences.sleepSchedule.weekdayWakeup}
                        onChange={(e) =>
                          handleSleepScheduleChange(
                            "weekdayWakeup",
                            e.target.value,
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className='preference-item mb-4'>
                  <label className='form-label'>Cleanliness Level</label>
                  <input
                    type='range'
                    className='form-range'
                    min='1'
                    max='5'
                    value={profile.preferences.cleanliness}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "cleanliness",
                        parseInt(e.target.value),
                      )
                    }
                    disabled={!isEditing}
                  />
                  <div className='d-flex justify-content-between'>
                    <small>Relaxed</small>
                    <small>Very Neat</small>
                  </div>
                </div>

                <div className='preference-item mb-4'>
                  <label className='form-label'>Noise Tolerance</label>
                  <input
                    type='range'
                    className='form-range'
                    min='1'
                    max='5'
                    value={profile.preferences.noise}
                    onChange={(e) =>
                      handlePreferenceChange("noise", parseInt(e.target.value))
                    }
                    disabled={!isEditing}
                  />
                  <div className='d-flex justify-content-between'>
                    <small>Silent</small>
                    <small>Social</small>
                  </div>
                </div>

                <div className='preference-item'>
                  <label className='form-label'>Guest Frequency</label>
                  <input
                    type='range'
                    className='form-range'
                    min='1'
                    max='5'
                    value={profile.preferences.guestsFrequency}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "guestsFrequency",
                        parseInt(e.target.value),
                      )
                    }
                    disabled={!isEditing}
                  />
                  <div className='d-flex justify-content-between'>
                    <small>Rarely</small>
                    <small>Frequently</small>
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

export default ProfilePage;
