import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    setIsProfileOpen(false);
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Navigation items based on authentication and role
  const getNavItems = () => {
    const commonLinks = (
      <>
        <li className='nav-item'>
          <Link className={`nav-link ${isActive("/")}`} to='/'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link className={`nav-link ${isActive("/about")}`} to='/about'>
            About
          </Link>
        </li>
        <li className='nav-item'>
          <Link className={`nav-link ${isActive("/contact")}`} to='/contact'>
            Contact
          </Link>
        </li>
      </>
    );

    if (!user) {
      return commonLinks;
    }

    if (user.role === "admin") {
      return (
        <>
          {commonLinks}
          <li className='nav-item'>
            <Link className={`nav-link ${isActive("/admin")}`} to='/admin'>
              Dashboard
            </Link>
          </li>
          <li className='nav-item dropdown'>
            <button
              className='nav-link dropdown-toggle'
              onClick={() => setIsOpen(!isOpen)}
            >
              Management
            </button>
            <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
              <li>
                <Link className='dropdown-item' to='/admin/users'>
                  Users
                </Link>
              </li>
              <li>
                <Link className='dropdown-item' to='/admin/tasks'>
                  Tasks
                </Link>
              </li>
              <li>
                <Link className='dropdown-item' to='/admin/maintenance'>
                  Maintenance
                </Link>
              </li>
              <li>
                <Link className='dropdown-item' to='/admin/expenses'>
                  Expenses
                </Link>
              </li>
            </ul>
          </li>
        </>
      );
    }

    return (
      <>
        {commonLinks}
        <li className='nav-item'>
          <Link
            className={`nav-link ${isActive("/dashboard/tasks")}`}
            to='/dashboard/tasks'
          >
            Tasks
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className={`nav-link ${isActive("/dashboard/maintenance")}`}
            to='/dashboard/maintenance'
          >
            Maintenance
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className={`nav-link ${isActive("/dashboard/expenses")}`}
            to='/dashboard/expenses'
          >
            Expenses
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          DormMate
        </Link>

        <button
          className={`navbar-toggler ${isOpen ? "" : "collapsed"}`}
          type='button'
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>{getNavItems()}</ul>

          <div className='nav-buttons d-flex align-items-center'>
            {!user ? (
              <>
                <Link to='/auth/login' className='btn btn-outline-primary me-2'>
                  Login
                </Link>
                <Link to='/auth/signup' className='btn btn-primary'>
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className='d-flex align-items-center'>
                  <span className='me-3 text-primary'>
                    Welcome, {user.name || "User"} ({user.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className='btn btn-outline-danger me-3'
                  >
                    <i className='bi bi-box-arrow-right me-1'></i>
                    Logout
                  </button>
                  <div className='profile-dropdown'>
                    <button
                      className='profile-icon btn btn-link'
                      onClick={toggleProfile}
                      aria-expanded={isProfileOpen}
                    >
                      <i className='bi bi-person-circle fs-4'></i>
                    </button>
                    <div
                      className={`dropdown-menu dropdown-menu-end ${
                        isProfileOpen ? "show" : ""
                      }`}
                    >
                      <div className='dropdown-header'>
                        <div className='d-flex align-items-center'>
                          <i className='bi bi-person-circle fs-4 me-2'></i>
                          <div>
                            <div className='fw-bold'>{user.name || "User"}</div>
                            <small className='text-muted'>{user.email}</small>
                          </div>
                        </div>
                      </div>
                      <div className='dropdown-divider'></div>
                      <Link to='/profile' className='dropdown-item'>
                        <i className='bi bi-person me-2'></i>My Profile
                      </Link>
                      <Link to='/profile/settings' className='dropdown-item'>
                        <i className='bi bi-gear me-2'></i>Settings
                      </Link>
                      {user.role === "admin" && (
                        <Link to='/admin/settings' className='dropdown-item'>
                          <i className='bi bi-shield-lock me-2'></i>Admin Settings
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
