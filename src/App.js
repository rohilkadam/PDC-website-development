import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery'; 
import Popper from 'popper.js'; 



import { useState } from 'react';
import { Route,Routes } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import ContactUs from './components/Contact Us/ContactUs';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

function App() {

  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    console.log(isopen);
    setisopen(!isopen);
  };


  return (
    <>
    <Navbar toggle={toggle} />
    

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element="{} "  />
    <Route path="/contact" element={<ContactUs/>}  />
    </Routes>
    </>
  );
}

export default App;
