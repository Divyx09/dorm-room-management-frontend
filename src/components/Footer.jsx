import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>DormMate</span>
            </Link>
            <p>Making student housing simple and accessible.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/room-finder">Room Finder</Link></li>
              <li><Link to="/roommate-matcher">Roommate Matcher</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h5>Contact</h5>
            <p>
              <a href="mailto:contact@dormmate.com">contact@dormmate.com</a>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {currentYear} DormMate. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
