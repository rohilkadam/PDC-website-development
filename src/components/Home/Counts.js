import React, { useEffect, useRef, useState } from 'react';
import { FaAward, FaBroadcastTower, FaFlask, FaUsers } from 'react-icons/fa';
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
                <strong>Happy Customers</strong> consequuntur quae qui deca rode
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
              <FaUserDoctor />
              <span>{visible && <CountUp start={0} end={30} duration={5} />}</span>
              <p>
                <strong>Staff</strong> adipisci atque cum quia aut numquam delectus
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
              <FaFlask />
              <span>{visible && <CountUp start={0} end={100} duration={5} />}</span>
              <p>
                <strong>Research Projects</strong> aut commodi quaerat. Aliquam ratione
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
              <FaAward />
              <span>{visible && <CountUp start={0} end={200} duration={5} />}</span>
              <p>
                <strong>Awards</strong> rerum asperiores dolor molestiae doloribu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counts;
