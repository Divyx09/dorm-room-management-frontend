import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-info">
                <Link
                  to="/"
                  className="footer-logo d-flex align-items-center mb-3"
                >
                  <span>DormMate</span>
                </Link>
                <p className="mb-4">
                  Making student housing simple and accessible. Find your
                  perfect dorm mate and living space with ease.
                </p>
                <div className="social-links">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5>Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-2 col-md-6">
              <h5>Services</h5>
              <ul className="footer-links">
                <li>
                  <Link to="/room-finder">Room Finder</Link>
                </li>
                <li>
                  <Link to="/roommate-matcher">Roommate Matcher</Link>
                </li>
                <li>
                  <Link to="/virtual-tours">Virtual Tours</Link>
                </li>
                <li>
                  <Link to="/property-listing">List Property</Link>
                </li>
                <li>
                  <Link to="/student-resources">Resources</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <h5>Contact Us</h5>
              <ul className="footer-contact">
                <li>
                  <i className="bi bi-geo-alt"></i>
                  <span>
                    123 Student Street, Campus Area
                    <br />
                    City, State 12345
                  </span>
                </li>
                <li>
                  <i className="bi bi-envelope"></i>
                  <a href="mailto:contact@dormmate.com">contact@dormmate.com</a>
                </li>
                <li>
                  <i className="bi bi-telephone"></i>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-md-0">
                © {currentYear} DormMate. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <ul className="footer-legal">
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
