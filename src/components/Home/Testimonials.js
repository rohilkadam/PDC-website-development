import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination,Autoplay } from 'swiper/modules';
import TestimonialsData from '../../Data/TestimonialsData';
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

const Testimonials = () => {

    const swiperParams = {
        speed: 800,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      };
    return (
        <>
            <section id="about" class="testimonials">
                <div class="container" data-aos="fade-up">

                    <div class="section-title">
                        <h2>Testimonials</h2>
                        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                    </div>



                    <Swiper
                   {...swiperParams}
                   pagination={true} modules={[Pagination,Autoplay]}
                        className='testimonials-slider'
                    >
                        {TestimonialsData.map((index,i)=>(
                            <SwiperSlide key={i}>
                            <div class="testimonial-item">
                            <p>
                                <BiSolidQuoteAltLeft className='quote-icon-left' />
                               {index.feedback}
                                <BiSolidQuoteAltLeft className='quote-icon-right' />
                            </p>
                            <img src={index.image} class="testimonial-img" alt="" />
                            <h3>{index.name}</h3>
                            <h4>{index.designation}</h4>
                        </div>
                        </SwiperSlide>
                        ))}

                        

                        
                        
                    </Swiper>

                </div>
            </section>
        </>
    )
}

export default Testimonials
