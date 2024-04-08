import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ServiceInfo.css";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
//import blogData from "../Data/blogs";
//import RelatedPosts from "./RelatedPosts";

function ServiceInfo() {
  
  // const postId=parseInt(id);
  const [serviceData, setserviceData] = useState([]);

  async function fetchservices() {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/service/fetchservice/${id}` // Include the ID parameter in the API call
      );
      
      setserviceData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchservices();
  }, []);

  const { id } = useParams(); // Access the 'id' parameter from the URL

  console.log("post");
  console.log(serviceData.length);
  
  // Assuming you want to display the post content, you can render it here
  return (
    <>
      <div className="body">
        <div className="service-text">
          <div className="container narrow-container">
            
              <div >
                {/* Render the post content here */}
                {/* For example: */}
                {serviceData && serviceData.name && (
                  <div>
                    <h3 className="card-title">{serviceData.name}</h3>
                    <img src={"https://img.freepik.com/premium-photo/3d-rendering-medical-ventilator-machine-hospital_493806-557.jpg?w=740"} alt="" className="card-img-top" />
                    <p className="card-text">{serviceData.description  }</p>
                  </div>
                )}
              </div>
            
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceInfo; 
