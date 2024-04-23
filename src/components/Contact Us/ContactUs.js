import React, { useState } from "react";
import axios from "axios";
import "./ContactUs.css";
import { CiMap } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pdc-backend-mg9n.onrender.com/api/message/sendmessage",
        formData
      );
      if (response.status === 200) {
        alert("Message sent successfully!");
        // Optionally, clear the form fields
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <section id="contact" className="contact body">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h2>Contact Us</h2>
          <div className="row justify-content-center">

            <div className="col-lg-4 col-md-6">
              <div className="info-item d-flex flex-column justify-content-center align-items-center">
                <div className="icon">
                  <BsEnvelope />
                </div>
                <h3>Email Us</h3>
                <p>poonadiabetescentre@gmail.com</p>
                <br></br>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="info-item  d-flex flex-column justify-content-center align-items-center">
                <div className="icon">
                  <BsTelephone />
                </div>
                <h3>Call Us</h3>
                <p>+91 9860438251 / +91 9112266110 <br />020 26333754 / 020 26330511</p>
              </div>
            </div>


            <div className="col-lg-4 col-md-6 center">
              <div className="info-item  d-flex flex-column justify-content-center align-items-center">
                <div className="icon">
                  <FaBusinessTime />
                </div>
                <h3>Visiting Hours</h3>
                <div>Monday to Saturday 8:30 am to 8:30 pm <br /><p style={{ textAlign: 'center' }}>[Sunday Closed] </p></div>
              </div>
            </div>

          </div>

          <div className="row justify-content-center mx-auto">
            <div className="col-lg-6">
              <div className="info-item  d-flex flex-column justify-content-center align-items-center">
                <div className="icon">
                  <CiMap />
                </div>
                <h3>Our Address</h3>
                <p>
                  {" "}
                  Unit 12, 13 & 14, Ground Floor, Gulmohar Apartment, General
                  Thimayya Road, 2420, East St, beside State Bank Of India,
                  Camp, Pune, Maharashtra 411001
                </p>
              </div>
            </div>
          </div>

          <div className="row gy-4 mt-1">
            <div className="col-lg-6 ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3783.3708035008176!2d73.8799830785736!3d18.51213834647778!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c04a14f31533%3A0x9841b59d487b0663!2sPoona%20Diabetes%20Centre!5e0!3m2!1sen!2sin!4v1706683070534!5m2!1sen!2sin"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="col-lg-6">
              <form className="message-form" onSubmit={handleSubmit}>
                <div className="row gy-4">
                  <div className="col-lg-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-6 form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
