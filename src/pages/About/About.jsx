import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/team/sarah.jpg',
      bio: 'Former student housing coordinator with 10+ years of experience.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/team/michael.jpg',
      bio: 'Tech innovator with a passion for solving student housing challenges.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: '/team/emily.jpg',
      bio: 'Specialized in creating seamless housing experiences for students.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Students Housed' },
    { number: '1000+', label: 'Partner Universities' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">About DormMate</h1>
          <p className="lead mb-4">
            Revolutionizing student housing through technology and community
          </p>
          <div className="hero-image mb-5">
            <img
              src="/about/hero-image.jpg"
              alt="DormMate Team"
              className="img-fluid rounded-3 shadow"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title mb-4">Our Mission</h2>
              <p className="section-text mb-4">
                At DormMate, we believe every student deserves a safe, comfortable,
                and welcoming place to call home during their academic journey.
                Our mission is to simplify the student housing experience through
                innovative technology and community-driven solutions.
              </p>
              <div className="mission-points">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Simplifying student housing search</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Creating lasting connections</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Ensuring safety and comfort</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card text-center p-4 bg-white rounded-3 shadow-sm">
                    <h3 className="stat-number">{stat.number}</h3>
                    <p className="stat-label mb-0">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Meet Our Team</h2>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="team-card text-center">
                  <div className="team-image mb-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-circle img-fluid"
                    />
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role text-primary mb-2">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Values</h2>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="value-card text-center p-4 bg-white rounded-3 shadow-sm">
                <i className="bi bi-shield-check fs-1 text-primary mb-3"></i>
                <h3 className="value-title">Trust</h3>
                <p className="value-text">Building reliable connections within our community</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="value-card text-center p-4 bg-white rounded-3 shadow-sm">
                <i className="bi bi-people fs-1 text-primary mb-3"></i>
                <h3 className="value-title">Community</h3>
                <p className="value-text">Fostering meaningful relationships among students</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="value-card text-center p-4 bg-white rounded-3 shadow-sm">
                <i className="bi bi-lightning fs-1 text-primary mb-3"></i>
                <h3 className="value-title">Innovation</h3>
                <p className="value-text">Continuously improving our platform and services</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="value-card text-center p-4 bg-white rounded-3 shadow-sm">
                <i className="bi bi-heart fs-1 text-primary mb-3"></i>
                <h3 className="value-title">Care</h3>
                <p className="value-text">Putting students' needs first in everything we do</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section text-center py-5">
        <div className="container">
          <h2 className="section-title mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="section-text mb-4">
            Join thousands of students who have found their ideal housing situation with DormMate
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/contact" className="btn btn-outline-primary btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;