import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoommateSurvey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [preferences, setPreferences] = useState({
    sleepSchedule: {
      weekdayBedtime: "22:00",
      weekdayWakeup: "07:00",
      weekendBedtime: "23:00",
      weekendWakeup: "09:00"
    },
    lifestyle: {
      cleanliness: 3,
      noise: 3,
      guestsFrequency: 2,
      studyAtHome: true
    },
    habits: {
      smoking: false,
      drinking: "occasionally",
      cooking: "sometimes"
    },
    interests: []
  });

  const interestOptions = [
    "Reading", "Gaming", "Sports", "Music", "Movies",
    "Cooking", "Art", "Fitness", "Travel", "Photography"
  ];

  const handleSliderChange = (category, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: parseInt(value)
      }
    }));
  };

  const handleCheckboxChange = (category, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleInterestToggle = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Survey submitted:', preferences);
    navigate('/roommate-matches');
  };

  return (
    <div className="preference-survey">
      <div className="survey-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="step-indicators">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`step-dot ${index + 1 <= currentStep ? 'active' : ''}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="survey-content">
        {currentStep === 1 && (
          <section className="survey-section">
            <h2><i className="bi bi-moon-stars"></i> Sleep Schedule</h2>
            <div className="time-preferences">
              <div className="time-group">
                <h3>Weekdays</h3>
                <div className="time-input">
                  <label>Bedtime</label>
                  <input
                    type="time"
                    value={preferences.sleepSchedule.weekdayBedtime}
                    onChange={(e) => handleCheckboxChange('sleepSchedule', 'weekdayBedtime', e.target.value)}
                  />
                </div>
                <div className="time-input">
                  <label>Wake up</label>
                  <input
                    type="time"
                    value={preferences.sleepSchedule.weekdayWakeup}
                    onChange={(e) => handleCheckboxChange('sleepSchedule', 'weekdayWakeup', e.target.value)}
                  />
                </div>
              </div>

              <div className="time-group">
                <h3>Weekends</h3>
                <div className="time-input">
                  <label>Bedtime</label>
                  <input
                    type="time"
                    value={preferences.sleepSchedule.weekendBedtime}
                    onChange={(e) => handleCheckboxChange('sleepSchedule', 'weekendBedtime', e.target.value)}
                  />
                </div>
                <div className="time-input">
                  <label>Wake up</label>
                  <input
                    type="time"
                    value={preferences.sleepSchedule.weekendWakeup}
                    onChange={(e) => handleCheckboxChange('sleepSchedule', 'weekendWakeup', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {currentStep === 2 && (
          <section className="survey-section">
            <h2><i className="bi bi-house-heart"></i> Lifestyle Preferences</h2>
            <div className="slider-group">
              <label>
                Cleanliness Level
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={preferences.lifestyle.cleanliness}
                    onChange={(e) => handleSliderChange('lifestyle', 'cleanliness', e.target.value)}
                  />
                  <div className="slider-labels">
                    <span>Relaxed</span>
                    <span>Very Neat</span>
                  </div>
                </div>
              </label>

              <label>
                Noise Tolerance
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={preferences.lifestyle.noise}
                    onChange={(e) => handleSliderChange('lifestyle', 'noise', e.target.value)}
                  />
                  <div className="slider-labels">
                    <span>Silent</span>
                    <span>Social</span>
                  </div>
                </div>
              </label>

              <label>
                Guest Frequency
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={preferences.lifestyle.guestsFrequency}
                    onChange={(e) => handleSliderChange('lifestyle', 'guestsFrequency', e.target.value)}
                  />
                  <div className="slider-labels">
                    <span>Rarely</span>
                    <span>Often</span>
                  </div>
                </div>
              </label>
            </div>
          </section>
        )}

        {currentStep === 3 && (
          <section className="survey-section">
            <h2><i className="bi bi-person-lines-fill"></i> Habits</h2>
            <div className="habits-group">
              <div className="habit-item">
                <label>
                  <input
                    type="checkbox"
                    checked={preferences.habits.smoking}
                    onChange={(e) => handleCheckboxChange('habits', 'smoking', e.target.checked)}
                  />
                  Smoking
                </label>
              </div>

              <div className="habit-item">
                <label>Drinking</label>
                <select
                  value={preferences.habits.drinking}
                  onChange={(e) => handleCheckboxChange('habits', 'drinking', e.target.value)}
                >
                  <option value="never">Never</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>

              <div className="habit-item">
                <label>Cooking</label>
                <select
                  value={preferences.habits.cooking}
                  onChange={(e) => handleCheckboxChange('habits', 'cooking', e.target.value)}
                >
                  <option value="rarely">Rarely</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="often">Often</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {currentStep === 4 && (
          <section className="survey-section">
            <h2><i className="bi bi-heart"></i> Interests</h2>
            <div className="interests-grid">
              {interestOptions.map(interest => (
                <div
                  key={interest}
                  className={`interest-tag ${preferences.interests.includes(interest) ? 'active' : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="survey-navigation">
        {currentStep > 1 && (
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentStep(prev => prev - 1)}
          >
            Previous
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            className="btn btn-primary"
            onClick={() => setCurrentStep(prev => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default RoommateSurvey;