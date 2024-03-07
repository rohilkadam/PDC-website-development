import React, { Fragment, useEffect, useState } from "react";
import "./Navbar.css";
import navbarItems from "../Data/NavbarItems";
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const WebsiteNavbar = () => {
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
    setIsMobile(navbar.classList.contains('navbar-mobile'));
  };

  const handleLinkClick = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('navbar-mobile');
    setIsMobile(false);
  };

  return (
    <>
    <div className="websitenavbar">
      <div id="topbar" className={` ${scrolled ? "topbar-scrolled" : ""} fixed-top`}>
        <div className="container d-flex justify-content-between p-2">
          <div className="contact-info d-flex align-items-center">
            <FaEnvelope /> <Link href="mailto:pdc@gmail.com">pdc@gmail.com</Link>
            <FaPhone /> <Link>+1 5589 55488 55</Link>
          </div>
          <div className="d-none d-lg-flex social-links align-items-center">
            <Link href="#" className="twitter"><FaTwitter /></Link>
            <Link href="#" className="facebook"><FaFacebook /></Link>
            <Link href="#" className="instagram"><FaInstagram /></Link>
          </div>
        </div>
        {/* Logo and Center Name */}
        <div className="logo-container row">
          <div className="col-md-3 col-sm-12 text-end">
            <img src="images/logo.png" alt="Poona Diabetic Centre Logo" className="img-fluid" />
          </div>
          <div className="col-md-6 col-sm-12 row-flex fw-bold">
            <div class="large-font text-center pt-1 fs-1">POONA DIABETES CENTRE</div>
            <div class="small-font text-center text-red ">NO-1 DIABETES SPECIALITY CENTRE IN PUNE | ISO 9001-2015 | ESTD. :2006</div>
          </div>
          <div className="col-md-3 col-sm-12 text-start">
            <img src="images/logo1.jpg" alt="NBA accrediation logo" className="img-fluid" />
          </div>
        </div>
      </div>
      <header id="header" className={`shadow fixed-top ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container d-flex align-items-center">
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              {navbarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className={`nav-link ${location.pathname === item.link ? "active" : ""}`}
                    to={item.link}
                    onClick={handleLinkClick} // Added onClick event to close mobile navbar
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-nav-toggle" onClick={handleMobileNavToggle}>
              {isMobile ? <FaXmark className="close" /> : <FaBars />}
            </div>
          </nav>
          <Link to="/appointment" className="appointment-btn scrollto ms-auto float-end">Make an Appointment</Link>
        </div>
      </header>

      </div>
    </>
  );
};

export default WebsiteNavbar;
