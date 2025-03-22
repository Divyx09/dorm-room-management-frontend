import React from 'react';
import { Link } from 'react-router-dom';

const MatchResults = () => {
  const matches = [
    {
      id: 1,
      name: "Sarah Chen",
      photo: "/images/avatars/sarah.jpg",
      matchPercentage: 95,
      matchingTraits: [
        "Similar sleep schedule (Night owl)",
        "Neat and organized",
        "Quiet study preferences"
      ],
      major: "Computer Science",
      year: "Junior"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      photo: "/images/avatars/michael.jpg",
      matchPercentage: 88,
      matchingTraits: [
        "Similar music taste",
        "Shared hobbies",
        "Both early risers"
      ],
      major: "Business",
      year: "Sophomore"
    },
    {
      id: 3,
      name: "Emily Taylor",
      photo: "/images/avatars/emily.jpg",
      matchPercentage: 85,
      matchingTraits: [
        "Similar cleanliness standards",
        "Both prefer quiet evenings",
        "Study-focused"
      ],
      major: "Psychology",
      year: "Senior"
    }
  ];

  return (
    <div className="match-results-container">
      <div className="match-results-header">
        <h1>Your Roommate Matches</h1>
        <p>We've found {matches.length} potential roommates based on your preferences</p>
      </div>

      <div className="matches-grid">
        {matches.map(match => (
          <div key={match.id} className="match-card">
            <div className="match-percentage">
              <div className="percentage-circle">
                <span>{match.matchPercentage}%</span>
                <small>Match</small>
              </div>
            </div>
            
            <div className="match-photo">
              <img src={match.photo} alt={match.name} />
            </div>

            <div className="match-info">
              <h2>{match.name}</h2>
              <p className="match-details">
                {match.major} • {match.year}
              </p>

              <div className="matching-traits">
                {match.matchingTraits.map((trait, index) => (
                  <span key={index} className="trait-badge">
                    {trait}
                  </span>
                ))}
              </div>

              <div className="match-actions">
                <Link 
                  to={`/profile/${match.id}`} 
                  className="btn btn-primary"
                >
                  View Profile
                </Link>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => console.log(`Message ${match.name}`)}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchResults;