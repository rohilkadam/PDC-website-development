import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Service.css';


function Service() {
  const [serviceData, setserviceData] = useState([]);

  async function fetchservices() {
    const res = await axios.get(
      `http://localhost:5000/api/service/fetchallservices`
    );
    
    setserviceData(res.data);
    
  }

  useEffect(() => {
    fetchservices();
  }, []);

  return (
    <>
    <div className="body">
      <div className="service-posts">
      
        
        <div  className="container">
        <h2>Services</h2>
        <div className="row">
        {serviceData.map(post => (
          
          <div key={post._id} className="col-lg-4 service-post service-card  shadow">
            
            <div className="card-body">
            <h5 className="card-title ">{post.name}</h5>
            <img src={post.image} alt="" className="card-img-top"/>
            <Link to={`/service/${post._id}`} className="btn btn-outline-danger">Read More</Link>
            </div>
          </div>
        ))}
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default Service;
