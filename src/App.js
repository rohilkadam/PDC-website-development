import './App.css';
import $ from 'jquery'; 

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap'

import Popper from 'popper.js'; 




import { useState , useEffect } from 'react';
import { Route,Routes, useLocation } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import ContactUs from './components/Contact Us/ContactUs';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import HealthPackage from './components/HealthPackages/HealthPackage';
import BookAppointment from './components/Book_Appointment/BookAppointment';
import Blog from './components/Blog/Blog';
import Achievements from './components/Achievements/Achievements';
import Gallery1 from './components/Gallery/Gallery';
import BlogText from './components/Blog/BlogText';
import Services from './components/Services/Services';
import Index from './Admin/Index';


function App() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

  


  return (
    <>
    
    <Navbar  />
    

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/healthPackages" element={<HealthPackage />}  />
    <Route path="/contact" element={<ContactUs/>}  />
    <Route path="/appointment" element={<BookAppointment />}  />
    <Route path="/blogs" element={<Blog />} />
    <Route path="/blog/:id" element={<BlogText />} />
    <Route path="/achievements" element={<Achievements />}  />
    <Route path="/gallery" element={<Gallery1 />} />
    <Route path="/services" element={<Services />} />


    </Routes>

    <Footer />
    </>
  );
}

export default App;
