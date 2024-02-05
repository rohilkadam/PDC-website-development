import React,{useEffect} from 'react'
import { FaAngleLeft , FaAngleRight } from "react-icons/fa";

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

        
        <div class="carousel-item active" style={{backgroundImage: "url(images/hero1.jpg)"}}>
          <div class="container w-75">
            <h2>Welcome to <span>PDC</span></h2>
            <p>Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel.</p>
            <a href="#about" class="btn-get-started scrollto">Read More</a>
          </div>
        </div>

       
        <div class="carousel-item" style={{backgroundImage: "url(images/hero.jpg)"}}>
          <div class="container w-75">
            <h2>Lorem Ipsum Dolor</h2>
            <p>Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel.</p>
            <a href="#about" class="btn-get-started scrollto">Read More</a>
          </div>
        </div>

        
        <div class="carousel-item" style={{backgroundImage: "url(images/hero2.jpeg)"}}>
          <div class="container w-75">
            <h2>Sequi ea ut et est quaerat</h2>
            <p>Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel.</p>
            <a href="#about" class="btn-get-started scrollto">Read More</a>
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
