import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DormMate
        </Link>
        
        <button 
          className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          
          <div className="nav-buttons d-flex align-items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary me-2">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="profile-dropdown">
                <button 
                  className="profile-icon btn btn-link"
                  onClick={toggleProfile}
                  aria-expanded={isProfileOpen}
                >
                  <i className="bi bi-person-circle fs-4"></i>
                </button>
                <div className={`dropdown-menu dropdown-menu-end ${isProfileOpen ? 'show' : ''}`}>
                  <div className="dropdown-header">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person-circle fs-4 me-2"></i>
                      <div>
                        <div className="fw-bold">John Doe</div>
                        <small className="text-muted">john@example.com</small>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item">
                    <i className="bi bi-person me-2"></i>My Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <i className="bi bi-gear me-2"></i>Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/logout" className="dropdown-item text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;