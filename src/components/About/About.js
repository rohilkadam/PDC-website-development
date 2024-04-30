import React from 'react'
import "./About.css";
import { FaBullseye } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { AiOutlineAim } from "react-icons/ai";

const About = () => {
  return (
    <>
    
    <div className='body'>
      <div id="about" className="about ">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6">
            <h2>About Us</h2>
            <div className="our-story">
              <h4>Est 2006</h4>
              <h3>Our Story</h3>
              <p>Since its inception in 2006, our Diabetes Centre has been dedicated to providing comprehensive care for individuals living with diabetes. With the aim of offering all-encompassing diabetes care under one roof, we have various departments, including Dietetics, Diabetes Education, Basic Composite Laboratory, and Foot Testing. Our wide array of services encompasses diet advice, foot care, eye care, structured diabetes care, ECG and CGMS monitoring, and a fully stocked pharmacy for our patients' convenience. Additionally, we pride ourselves on offering value-added services such as Fibro-scan camps, Bone Mineral Density (BMD) camps, and initiatives to mark World Diabetes Day. With an extensive range of lab tests available, including HbA1c, liver profile, bone profile, kidney function tests, and lipid profile, we ensure comprehensive health monitoring for our patients. With over 35,000 registered patients and counting, we have become a trusted destination for diabetes care in our community. We also offer internship opportunities in departments such as dietetics, clinical research, and medical laboratory, fostering education and professional growth. Our dedicated staff of 20-25 individuals works tirelessly to uphold our commitment to excellence. As the only NABH accredited Diabetes Centre in India, we are proud to set the standard for quality care and innovation in diabetes management.</p>
              <div className="watch-video d-flex align-items-center position-relative">
                <i className="bi bi-play-circle"></i>
                {/* <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" >Watch Video</a> */}
              </div>
            </div>
          </div>
          
          <img src="images/aboutus1.jpeg" className="col-lg-6 our-story-img" alt="" />
          
          
        </div>
      </div>
      </div>

      <section id="about-boxes" className="about-boxes">
      <div className="container" data-aos="fade-up">

        <div className="row">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
              <div className="card">
              <img src="images/Vision1.jpg" alt="..." />
              <div className="card-icon">
              <AiOutlineAim />
              </div>
              <div className="card-body">
                  <h5 className="card-title"><a href="">Our Vision</a></h5>
                  <p className="card-text">To be at the forefront of Diabetes Care, through Structured Diabetes Management Programme designed to offer Compassionate, Affordable, World-Class Standard of Care in Diabetes.
</p>
              </div>
              </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
              <div className="card">
              <img src="images/ourplan1.jpg" className="card-img-top" alt="..." />
              <div className="card-icon">
              <CiCalendarDate />
              </div>
              <div className="card-body">
                  <h5 className="card-title"><a href="">Our Plan</a></h5>
                  <p className="card-text"> To empower patients in managing their diabetes effectively and improving their overall well-being and to be dedicated to providing personalized care tailored to every patients' unique needs through a combination of education, support, and treatment.</p>
              </div>
              </div>
          </div> 
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300" id='c1'>
              <div className="card"  >
              <img src="images/ourmission.jpg" alt="..." />
              <div className="card-icon">
              <FaBullseye />
              </div>
              <div className="card-body">
                  <h5 className="card-title"><a href="">Our Mission</a></h5>
                  <p className="card-text">To Save Loss of Vision, Loss of Limb, Loss of Life by Prevention  of Diabetes and Complications of Diabetes, through Focused, Personalized, Intensive Diabetes Care.  
 </p>
              </div>
              </div>
          </div>
        </div>
      </div>
      </section>

      <div id="about2" className="about2">

        <div className="container" data-aos="fade-up">

          <div className="row">

            <div className="col-lg-6 video-box align-self-baseline position-relative" data-aos="zoom-in" data-aos-delay="100">
              <img src="images/empoweringlives.jpg" className="img-fluid" alt=""/>
              {/* <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox play-btn mb-4"></a> */}
            </div>

            <div className="col-lg-6 pt-3 pt-lg-0 content">
              <h3>Empowering Lives</h3>
              <p>
                At Poona Diabetes Centre, our commitment to a patient-centric approach is at the heart of our mission to empower lives affected by diabetes. Beyond the clinical expertise and advanced treatments, we understand that each person's journey with diabetes is a unique story of resilience. We take pride in fostering an environment that not only manages the medical aspects of diabetes but also offers compassionate support for the emotional and lifestyle aspects of living with this condition. In the testimonials shared by our diabetes warriors, you'll find narratives of triumph, courage, and the transformative power of personalized care. These stories exemplify the impact of our patient-focused approach, showcasing the genuine connections we build with our patients. Join us in celebrating these inspiring journeys as we continue our dedicated mission to provide comprehensive and compassionate care for those navigating life with diabetes.
              </p>
            </div>

          </div>

        </div>
      </div>
      </div>
  
    </>
  )
}

export default About