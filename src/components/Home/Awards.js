import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay } from 'swiper/modules';
import AwardsData from '../Data/AwardsData';

const Awards = () => {
    const swiperParams = {
        speed: 700,
        loop: true,
        autoplay: {
            delay: 2500,
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
            <section id="about" class="awards">
                <div class="container" data-aos="fade-up">

                    <div class="section-title">
                        <h2> Achievements</h2>
                        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                    </div>

                    <Swiper {...swiperParams}
                   pagination={true} modules={[Pagination,Autoplay]}
                   className='awards-slider'>
                        {AwardsData.map((index,i)=>(
                            <SwiperSlide key={i}>
                                <div class="card card-award">
                                    <img class="card-img rounded-0" src={index.img} alt="" />
                                    <div class="card-award__body text-center">
                                        <h3>{index.name}</h3>
                                        <p>{index.by}</p>
                                        <div class="award-footer d-flex justify-content-between">
                                            <p>
                                                {index.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </section>
        </>
    )
}

export default Awards
