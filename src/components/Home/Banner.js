import React,{useEffect} from 'react'
import { FaAngleLeft , FaAngleRight } from "react-icons/fa";
import './Banner.css'
const Banner = () => {
  useEffect(() => {
    const heroCarouselIndicators = document.getElementById("hero-carousel-indicators");
    const heroCarouselItems = document.querySelectorAll('#heroCarousel .carousel-item');

    heroCarouselItems.forEach((item, index) => {
      heroCarouselIndicators.innerHTML += `<li data-bs-target='#heroCarousel' data-bs-slide-to='${index}' ${index === 0 ? 'class="active"' : ''}></li>`;
    });
  }, []);

  return (

    <>
      <section id="hero">
    <div id="heroCarousel" data-bs-interval="5000" class="carousel slide carousel-fade" data-bs-ride="carousel">

      <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

      <div class="carousel-inner" role="listbox">

        
        <div class="carousel-item active" style={{backgroundImage: "url(images/slider1.webp)"}}>
          <div class="container w-75">
            <h2>Welcome to <span>Poona Diabetes Centre</span></h2>
            <p>NABH Accredited Diabetes Speciality Centre in Pune, with more than 35,000 registered patients </p>
            {/* <a href="#about" class="btn-get-started scrollto">Read More</a> */}
          </div>
        </div>

       
        <div class="carousel-item" style={{backgroundImage: "url(images/slider2.webp)"}}>
          <div class="container w-75">
            <h2>Total Diabetes Care under One roof </h2>
            <p>We excel in delivering comprehensive and meticulously structured care for individuals with diabetes. Our approach encompasses a holistic framework that addresses not only the immediate medical needs but also focuses on long-term management, lifestyle modifications, and patient education. </p>
            {/* <a href="#about" class="btn-get-started scrollto">Read More</a> */}
          </div>
        </div>

        
        <div class="carousel-item" style={{backgroundImage: "url(images/slider3.webp)"}}>
          <div class="container w-75">
            <h2>Felicitation by Health Minister of Maharashtra</h2>
            <p>Founder and Director of Poona Diabetes Centre Dr. Yogesh Kadam honoured and felicitated by the then Health Minister of Maharashtra, Hon. Mr. Rajesh Tope </p>
            {/* <a href="#about" class="btn-get-started scrollto">Read More</a> */}
          </div>
        </div>

          <div class="carousel-item" style={{backgroundImage: "url(images/slider4th.webp)"}}>
          <div class="container w-75">
            <h2>Achieved accreditation by NABH </h2>
            <p>We are the sole diabetes speciality centre in whole of India to have been accredited by National Accreditation Board for Hospitals and Healthcare Providers(NABH) </p>
            {/* <a href="#about" class="btn-get-started scrollto">Read More</a> */}
          </div>
          </div>

          <div class="carousel-item" style={{backgroundImage: "url(images/slider5th.webp)"}}>
          <div class="container w-75">
            <h2> Our Goal </h2>
            <p>Our primary goal is to fight together against diabetes while providing comprehensive care and support to enhance the well-being of our patients.</p>
            {/* <a href="#about" class="btn-get-started scrollto">Read More</a> */}
          </div>
          </div>


      </div>

      <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"> <FaAngleLeft /> </span>
      </a>

      <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon " aria-hidden="true"> <FaAngleRight /> </span>
      </a>

    </div>
  </section>




    </>
  )
}

export default Banner;
