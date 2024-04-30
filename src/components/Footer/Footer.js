import React from 'react'
import './Footer.css'
import { FaAngleRight, FaEnvelope, FaFacebook, FaLinkedin, FaMap, FaPhone, FaTwitter } from 'react-icons/fa'
import { FaInstagram, FaLocationDot } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom';


const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">

              <div className="col-lg-3 col-md-6">
                <div className="footer-info">
                  <div className='logo ms-5 mb-3'>
                    <img src='images/logo.png' className='img-fluid ' />
                  </div>
                  <h3>Poona Diabetes Centre</h3>
                  <p>

                  </p>
                  <div className="social-links mt-3">
                    {/* <a href="#" class="twitter"><FaTwitter /></a> */}
                    <Link to="https://www.linkedin.com/company/poona-diabetes-centre" className="linkedin"><FaLinkedin /></Link>
                    <Link to="https://www.facebook.com/p/Poona-Diabetes-Centre-100066953806532/" className="facebook"><FaFacebook /></Link>
                    <Link to="https://instagram.com/poonadiabetescentre" className="instagram"><FaInstagram /></Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><FaAngleRight /><Link to="">Home</Link></li>
                  <li><FaAngleRight /> <Link to="./about">About us</Link></li>
                  <li><FaAngleRight /> <Link to="./services">Services</Link></li>
                  <li><FaAngleRight /> <Link to="./blogs">Blogs</Link></li>


                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links link2">
                
                <ul>
                  <li><FaAngleRight /> <Link to="./healthPackages">Health Packages</Link></li>
                  <li><FaAngleRight /> <Link to="./gallery">Gallery</Link></li>
                  <li><FaAngleRight /> <Link to="./contact">Contact Us</Link></li>
                  <li><FaAngleRight /> <Link to="./achievements">Achievements</Link></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Contact Us</h4>
                <ul>
                  <span className='fw-bold'>Address :  </span><br></br>
                  <li> Unit 12, 13 & 14, Ground Floor, Gulmohar Apartment, General Thimayya Road, 2420, East St, beside State Bank Of India, Camp, Pune, Maharashtra 411001 </li>
                  <span className='fw-bold'>Phone :  </span> <br></br> <a href="tel:+91 9860438251"> </a>    +91 9860438251 / +91 9112266110 <br />020 26333754 / 020 26330511
                  <li><span className='fw-bold'>Email :  </span><a href="mailto:poonadiabetescentre@gmail.com">   poonadiabetescentre@gmail.com</a></li>
                  <span className='fw-bold'>Operating Hours: </span>
                  <li> Monday to Saturday  8:30 am to 8:30 pm <br></br> [Sunday Closed]</li>

                </ul>
              </div>



            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>Poona Diabetes Centre</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
            Developed By Computer Engineering Students of Pune Institute of Computer Technology (PICT, Pune) - Mayur Shirke, Mayuri Kolhe, Rohil Kadam
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer
