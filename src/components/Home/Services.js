import React from 'react'
import ServicesData from '../../Data/ServicesData'
import { FaHospital } from 'react-icons/fa'

const Services = () => {
  return (
    <>
    <section id="services" class="services">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Our Services</h2>
          <p>Ea vitae aspernatur deserunt voluptatem impedit deserunt magnam occaecati dssumenda quas ut ad dolores adipisci aliquam.</p>
        </div>

        <div class="row gy-5">

          {ServicesData.map((index,i)=>(
                <div class="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="200" key={i}>
                <div class="service-item">
                  <div class="img">
                    <img src={index.img} class="img-fluid" alt=""/>
                  </div>
                  <div class="details position-relative">
                    <div class="icon">
                      <FaHospital/>
                    </div>
                    <a href="#" class="stretched-link">
                      <h3>{index.title}</h3>
                    </a>
                    <p>{index.description}</p>
                  </div>
                </div>
              </div>
          ))}

          

         

          

        </div>

      </div>
    </section>
    </>
  )
}

export default Services
