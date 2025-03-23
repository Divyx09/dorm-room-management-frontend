import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    setIsProfileOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

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

    // Convert role to uppercase for consistency
    const userRole = user.role?.toUpperCase();

    if (userRole === "ADMIN") {
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Management
            </button>
            <ul className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}>
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

    // USER role navigation
    return (
      <>
        {commonLinks}
        <li className='nav-item'>
          <Link
            className={`nav-link ${isActive("/dashboard/tasks")}`}
            to='/dashboard/tasks'
          >
            Dashboard
          </Link>
        </li>
        <li className='nav-item dropdown'>
          <button
            className='nav-link dropdown-toggle'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Services
          </button>
          <ul className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}>
            <li>
              <Link className='dropdown-item' to='/dashboard/tasks'>
                Tasks
              </Link>
            </li>
            <li>
              <Link className='dropdown-item' to='/dashboard/maintenance'>
                Maintenance
              </Link>
            </li>
            <li>
              <Link className='dropdown-item' to='/dashboard/expenses'>
                Expenses
              </Link>
            </li>
          </ul>
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
          className={`navbar-toggler ${isMenuOpen ? "" : "collapsed"}`}
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
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
                  <div className='profile-dropdown me-3'>
                    <button
                      className='profile-icon btn btn-link'
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
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
                      {user.role === "ADMIN" && (
                        <Link to='/admin/settings' className='dropdown-item'>
                          <i className='bi bi-shield-lock me-2'></i>Admin Settings
                        </Link>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className='btn btn-outline-danger'
                  >
                    <i className='bi bi-box-arrow-right me-1'></i>
                    Logout
                  </button>
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
