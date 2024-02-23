import React from 'react'
import './Footer.css'
import { FaAngleRight, FaEnvelope, FaFacebook, FaLinkedin, FaMap, FaPhone, FaTwitter } from 'react-icons/fa'
import { FaInstagram, FaLocationDot } from 'react-icons/fa6'


const Footer = () => {
  return (
    <>
      <footer id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">

              <div class="col-lg-3 col-md-6">
                <div class="footer-info">
                  <div className='logo ms-5 mb-3'>
                    <img src='images/logo.png' className='img-fluid ' />
                  </div>
                  <h3>Poona Diabetic Centre</h3>
                  <p>

                  </p>
                  <div class="social-links mt-3">
                    <a href="#" class="twitter"><FaTwitter /></a>
                    <a href="#" class="facebook"><FaFacebook /></a>
                    <a href="#" class="instagram"><FaInstagram /></a>
                    <a href="#" class="linkedin"><FaLinkedin /></a>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><FaAngleRight /><a href="#">Home</a></li>
                  <li><FaAngleRight /> <a href="#">About us</a></li>
                  <li><FaAngleRight /> <a href="#">Services</a></li>
                  <li><FaAngleRight /> <a href="#">Terms of service</a></li>
                  <li><FaAngleRight /> <a href="#">Privacy policy</a></li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><FaAngleRight /> <a href="#">Web Design</a></li>
                  <li><FaAngleRight /> <a href="#">Web Development</a></li>
                  <li><FaAngleRight /> <a href="#">Product Management</a></li>
                  <li><FaAngleRight /> <a href="#">Marketing</a></li>
                  <li><FaAngleRight /> <a href="#">Graphic Design</a></li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 footer-links">
                <h4>Contact Us</h4>
                <ul>
                  <li> Unit 12, 13 & 14, Ground Floor, Gulmohar Apartment, General Thimayya Road, 2420, East St, beside State Bank Of India, Camp, Pune, Maharashtra 411001 </li>
                  <li><span className='fw-bold'>Phone : </span> <a href="tel:+918888888888"> +91 8888888888</a> </li>
                  <li><span className='fw-bold'>Email : </span><a href="mailto:pdc@gmail.com"> pdc@gmail.com</a></li>
                </ul>
              </div>



            </div>
          </div>
        </div>

        <div class="container">
          <div class="copyright">
            &copy; Copyright <strong><span>Poona Diabetic Centre</span></strong>. All Rights Reserved
          </div>
          <div class="credits">

          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer
