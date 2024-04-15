import React, { useEffect, useRef, useState } from 'react';
import { FaAward, FaBroadcastTower, FaFlask, FaUsers, FaHistory } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import CountUp from 'react-countup';

const Counts = () => {
  const [visible, setVisible] = useState(false);
  const countsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(countsRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this value as needed to trigger when the element is visible
      }
    );

    if (countsRef.current) {
      observer.observe(countsRef.current);
    }

    return () => {
      if (countsRef.current) {
        observer.unobserve(countsRef.current);
      }
    };
  }, []);

  return (
    <section id="counts" className="counts">
      <div className="container" data-aos="fade-up">
        <div className="row no-gutters">
          <div ref={countsRef} className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
              <FaUsers />
              <span>{visible && <CountUp start={0} end={35000} duration={3} />}</span>
              <p>
                <strong>Patients</strong> under treatment at Poona Diabetes Centre 
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
              <FaUserDoctor />
              <span>{visible && <CountUp start={0} end={25} duration={5} />}</span>
              <p>
                <strong>Trained & experienced </strong>doctors and staff working under Dr. Yogesh Kadam
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
              <FaHistory />
              <span>{visible && <CountUp start={0} end={18} duration={5} />}</span>
              <p>
                <strong>Years </strong> of establishment and serving our community with dedication.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
              <FaAward />
              <span>{visible && <CountUp start={0} end={28} duration={5} />}</span>
              <p>
                <strong>Years</strong>  of seasoned expertise characterizes the doctor's professional journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counts;
