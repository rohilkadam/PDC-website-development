import './App.css';
import $ from 'jquery'; 

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap'

import Popper from 'popper.js'; 




import { useState } from 'react';
import { Route,Routes } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import ContactUs from './components/Contact Us/ContactUs';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import HealthPackage from './components/HealthPackages/HealthPackage';
import BookAppointment from './components/Book_Appointment/BookAppointment';
import Blog from './components/Blog/Blog';

function App() {



  return (
    <>
    <Navbar  />
    

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/healthPackages" element={<HealthPackage />}  />
    <Route path="/contact" element={<ContactUs/>}  />
    <Route path="/appointment" element={<BookAppointment />}  />
    <Route path="/blog" element={<Blog />} />
    </Routes>

    <Footer />
    </>
  );
}

export default App;
