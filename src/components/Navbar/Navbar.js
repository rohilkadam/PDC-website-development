import React, { useEffect, useState } from "react";
import "./Navbar.css";
import navbarItems from "./NavbarItems";
import { Link, useLocation } from 'react-router-dom';
import { FaBars,  FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";

const Navbar = ({ toggle }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileNavToggle = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('navbar-mobile');
   setIsMobile(navbar.classList.contains('navbar-mobile') );
  };

  return (
    <>
      <div id="topbar" className={`d-flex align-items-center ${scrolled ? "topbar-scrolled" : ""} fixed-top`}>
        <div className="container d-flex justify-content-between">
          <div className="contact-info d-flex align-items-center">
            <FaEnvelope /> <Link href="mailto:contact@example.com">pdc@gmail.com</Link>
            <FaPhone /> +1 5589 55488 55
          </div>
          <div className="d-none d-lg-flex social-links align-items-center">
            <Link href="#" className="twitter"><FaTwitter /></Link>
            <Link href="#" className="facebook"><FaFacebook /></Link>
            <Link href="#" className="instagram"><FaInstagram/></Link>
          </div>
        </div>
      </div>

      <header id="header" className={`fixed-top ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto"><Link to="index.html">PDC</Link></h1>

          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              {navbarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className={`nav-link ${location.pathname === item.link ? "active" : ""}`}
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mobile-nav-toggle" onClick={handleMobileNavToggle}>
                {isMobile ? <FaXmark  className="close" /> : <FaBars  />}
            </div>
            
          </nav>

          <Link to="#appointment" className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span> Appointment</Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
