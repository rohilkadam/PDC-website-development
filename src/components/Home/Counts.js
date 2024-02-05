import React from 'react'
import { FaAward, FaBroadcastTower, FaFlask, FaUsers } from "react-icons/fa";
import {FaUserDoctor } from 'react-icons/fa6'
import CountUp from "react-countup";

const Counts = () => {
  return (
    <>
    <section id="counts" class="counts">
      <div class="container" data-aos="fade-up">

        <div class="row no-gutters">

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
              <FaUsers />
              <span ><CountUp
                    start={0}
                    end={35000}
                    duration={3}
                /></span>

              <p><strong>Happy Customers</strong> consequuntur quae qui deca rode</p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
            <FaUserDoctor />
              <span ><CountUp
                    start={0}
                    end={30}
                    duration={5}
                /></span>
              <p><strong>Staff</strong> adipisci atque cum quia aut numquam delectus</p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
              <FaFlask />
              <span ><CountUp
                    start={0}
                    end={100}
                    duration={5}
                /></span>
              <p><strong>Research Projects</strong> aut commodi quaerat. Aliquam ratione</p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
              <FaAward />
              <span ><CountUp
                    start={0}
                    end={200}
                    duration={5}
                /></span>
              <p><strong>Awards</strong> rerum asperiores dolor molestiae doloribu</p>
              <a href="#">Find out more &raquo;</a>
            </div>
          </div>

        </div>

      </div>
    </section>
    </>
  )
}

export default Counts
