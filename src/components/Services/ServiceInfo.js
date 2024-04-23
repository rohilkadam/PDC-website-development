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
        `https://pdc-backend-mg9n.onrender.com/api/service/fetchservice/${id}` // Include the ID parameter in the API call
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
          <div className="container narrow-container shadow p-5 w-75">
            
              <div >
                {/* Render the post content here */}
                {/* For example: */}
                {serviceData && serviceData.name && (
                  <div>
                    <h3 className="card-title fw-bold mb-5">{serviceData.name}</h3>
                    <img src={serviceData.image} alt="" className="card-img-top mb-3 shadow" />
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
