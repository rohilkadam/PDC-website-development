import './App.css';
import $ from 'jquery';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap'

import Popper from 'popper.js';

import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router';

import AdminNavbar from './Admin/Header/AdminNavbar';
import WebsiteNavbar from './components/Navbar/WebsiteNavbar';
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
//import Services from './components/Services/Services';
import Index from './Admin/Index';
import BlogView from './Admin/Dashboard/BlogView';
import Login from './Admin/Dashboard/Login';
import UserContext from './context/UserContext';
import AddBlog from './Admin/Dashboard/AddBlog';
import AwardView from './Admin/Dashboard/AwardView';
import UpdateAward from './Admin/Dashboard/UpdateAward';
import UpdateTestimonial from './Admin/Dashboard/UpdateTestimonial';
import AddAward from './Admin/Dashboard/AddAward';
import TestimonialView from './Admin/Dashboard/TestimonialView';
import AddTestimonial from './Admin/Dashboard/AddTestimonial';
import GalleryView from './Admin/Dashboard/GalleryView';
import AddGallery from './Admin/Dashboard/AddGallery';
import AppointmentView from './Admin/Dashboard/AppointmentView';
import MessageView from './Admin/Dashboard/MessageView';

import ServiceInfo from './components/Services/ServiceInfo';
import Service from './components/Services/Service';
import ServiceView from './Admin/Dashboard/ServiceView';
import AddService from './Admin/Dashboard/AddService';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
     window.scrollTo(0, 0);
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await axios.post(
        "https://pdc-backend-mg9n.onrender.com/api/auth/tokenIsValid",
        null,
        { headers: { "auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("https://pdc-backend-mg9n.onrender.com/api/auth/getuser", {
          headers: { "auth-token": token },
        });
        setUserData({
          token,
          user: "user",
        });
      } else {
        // If token is not valid, remove it from local storage and redirect to login
        localStorage.removeItem("auth-token");
      }
    };

    checkLoggedIn();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {isAdminRoute && !userData.token && <Navigate to="/admin/login" />}
      {isAdminRoute ? userData.token ? <AdminNavbar /> : " " : <WebsiteNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/healthPackages" element={<HealthPackage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/appointment" element={<BookAppointment />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogText />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/gallery" element={<Gallery1 />} />
        <Route path="/services" element={<Service/>} />
        <Route path="/service/:id" element={<ServiceInfo />} />
        <Route path="/admin" element={<Index />} />
        <Route path="/admin/blogs" element={<BlogView />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/addblog" element={<AddBlog />} />
        <Route path="/admin/award" element={<AwardView />} />
        <Route path="/admin/addaward" element={<AddAward />} />
        <Route path="/admin/updateaward/:id" element={<UpdateAward />} />
        <Route path="/admin/updatetestimonial/:id" element={<UpdateTestimonial />} />
        <Route path="/admin/testimonial" element={<TestimonialView />} />
        <Route path="/admin/addtestimonial" element={<AddTestimonial />} />

        <Route path="/admin/image" element={<GalleryView />} />
        <Route path="/admin/addimage" element={<AddGallery />} />
        <Route path="/admin/appointment" exact element={<AppointmentView/> }  />
      <Route path="/admin/message" exact element={<MessageView/> }  />
      <Route path="/admin/addservice" exact element={<AddService /> }  />
      <Route path="/admin/service" exact element={<ServiceView /> }  />

      </Routes>
      {!isAdminRoute && <Footer />}
    </UserContext.Provider>
  );
}

export default App;