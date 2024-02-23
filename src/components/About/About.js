import React from 'react'
import "./About.css";
const About = () => {
  return (
    <>
    
    <div className='body'>
      <div id="about" className="about ">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6">
            <h2>About Us</h2>
            <div className="our-story shadow">
              <h4>Est 2006</h4>
              <h3>Our Story</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint molestiae, dolorem enim nostrum ducimus debitis pariatur adipisci magnam numquam incidunt laboriosam molestias aperiam consectetur quis iusto, ratione perferendis dolorum totam quia provident illum corrupti neque nobis! Reiciendis sequi enim, voluptates in laudantium illo mollitia tempora ducimus repellat possimus sit! Id repellat accusantium exercitationem inventore! Ut at vero quidem voluptates error aspernatur ducimus alias qui, quaerat voluptate similique tempora, facere tempore?</p>
              <div className="watch-video d-flex align-items-center position-relative">
                <i className="bi bi-play-circle"></i>
                <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" >Watch Video</a>
              </div>
            </div>
          </div>
          
          <img src="https://img.freepik.com/free-psd/interior-modern-emergency-room-with-empty-nurses-station-generative-ai_587448-2137.jpg?w=826&t=st=1706612487~exp=1706613087~hmac=e4083bbea02b8a221dbbd98d64d4463528a85a1ff687001ad07d449747881cdf" className="col-lg-6 shadow" alt="" />
          
          
        </div>
      </div>
      </div>

      <section id="about-boxes" className="about-boxes">
      <div className="container" data-aos="fade-up">

        <div className="row">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
              <div className="card shadow">
              <img src="https://img.freepik.com/free-photo/empty-laboratory-with-scientific-monitor-desk_482257-18203.jpg?size=626&ext=jpg" alt="..." />
              <div className="card-icon">
                  <i className="ri-brush-4-line"></i>
              </div>
              <div className="card-body ">
                  <h5 className="card-title"><a href="">Our Mission</a></h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
              </div>
              </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
              <div className="card shadow">
              <img src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg?w=740&t=st=1706606855~exp=1706607455~hmac=3f65eea35fbcfc4583d42bcbdd10d8ef86c66d22e0eadbeaa70cb94fce07e9c1" className="card-img-top" alt="..." />
              <div className="card-icon">
                  <i className="ri-calendar-check-line"></i>
              </div>
              <div className="card-body">
                  <h5 className="card-title"><a href="">Our Plan</a></h5>
                  <p className="card-text">ted ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit. In repellat vel amet perferendis rerum quis distinctio quam consequatur ex veniam.</p>
              </div>
              </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
              <div className="card shadow">
              <img src="https://img.freepik.com/free-photo/empty-laboratory-with-scientific-monitor-desk_482257-18203.jpg?size=626&ext=jpg" alt="..." />
              <div className="card-icon">
                  <i className="ri-movie-2-line"></i>
              </div>
              <div className="card-body">
                  <h5 className="card-title"><a href="">Our Vision</a></h5>
                  <p className="card-text">Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. </p>
              </div>
              </div>
          </div>
        </div>
      </div>
      </section>

      <div id="about2" className="about2">

        <div className="container shadow" data-aos="fade-up">

          <div className="row">

            <div className="shadow col-lg-6 video-box align-self-baseline position-relative" data-aos="zoom-in" data-aos-delay="100">
              <img src="https://img.freepik.com/free-photo/empty-laboratory-with-scientific-monitor-desk_482257-18203.jpg?size=626&ext=jpg" className="img-fluid" alt=""/>
              <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox play-btn mb-4"></a>
            </div>

            <div className="col-lg-6 pt-3 pt-lg-0 content">
              <h3>Empowering Lives</h3>
              <p>
                At Poona Diabetes, our commitment to a patient-centric approach is at the heart of our mission to empower lives affected by diabetes. Beyond the clinical expertise and advanced treatments, we understand that each person's journey with diabetes is a unique story of resilience. We take pride in fostering an environment that not only manages the medical aspects of diabetes but also offers compassionate support for the emotional and lifestyle aspects of living with this condition. In the testimonials shared by our diabetes warriors, you'll find narratives of triumph, courage, and the transformative power of personalized care. These stories exemplify the impact of our patient-focused approach, showcasing the genuine connections we build with our patients. Join us in celebrating these inspiring journeys as we continue our dedicated mission to provide comprehensive and compassionate care for those navigating life with diabetes.
              </p>
            </div>

          </div>

        </div>
      </div>
      </div>
  
    </>
  )
}

export default About
