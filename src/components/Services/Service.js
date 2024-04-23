import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Service.css';

function Service() {
  const [services, setServices] = useState([]);
  const [regularServices, setRegularServices] = useState([]);
  const [valueAddedServices, setValueAddedServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await axios.get('https://pdc-backend-mg9n.onrender.com/api/service/fetchallservices');
        setServices(res.data);
        // Filter services based on their type
        const regular = res.data.filter(service => service.servicetype === 'Regular');
        const valueAdded = res.data.filter(service => service.servicetype === 'Value Added');
        setRegularServices(regular);
        setValueAddedServices(valueAdded);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="body">
      <div className="service-posts">
        <div className="container">
          <h2>Services</h2>
          <div className="row">
            {regularServices.map(service => (
              <div key={service._id} className="col-lg-4 service-post service-card shadow">
                <div className="card-body">
                  <h5 className="card-title my-3">{service.name}</h5>
                  <img src={service.image} alt="" className="card-img-top" />
                  <Link to={`/service/${service._id}`} className="btn btn-outline-danger">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="service-posts">
        <div className="container">
          <h2>Value Added Services</h2>
          <div className="row">
            {valueAddedServices.map(service => (
              <div key={service._id} className="col-lg-4 service-post service-card shadow">
                <div className="card-body">
                  <h5 className="card-title my-3 ">{service.name}</h5>
                  <img src={service.image} alt="" className="card-img-top" />
                  <Link to={`/service/${service._id}`} className="btn btn-outline-danger">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
