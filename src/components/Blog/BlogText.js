import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BlogText.css";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
//import blogData from "../Data/blogs";
import RelatedPosts from "./RelatedPosts";

function BlogText() {
  
  // const postId=parseInt(id);
  const [blogData, setblogData] = useState([]);

  async function fetchblogs() {
    try {
      const res = await axios.get(
        `https://pdc-backend-mg9n.onrender.com/api/blogs/fetchblog/${id}` // Include the ID parameter in the API call
      );
      
      setblogData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchblogs();
  }, []);

  const { id } = useParams(); // Access the 'id' parameter from the URL

  console.log("post");
  console.log(blogData.length);
  
  // Assuming you want to display the post content, you can render it here
  return (
    <>
      <div className="body">
        <div className="blog-text">
          <div className="container-lg">
            <div className="row">
              <div  className="col-lg-8">
                {/* Render the post content here */}
                {/* For example: */}
                {blogData && blogData.title && (
                  <div>
                    <h3 className="card-title">{blogData.title}</h3>
                    <img src={blogData.image} alt="" className="card-img-top" />
                    <p className="card-text">{blogData.description  }</p>
                  </div>
                )}
              </div>
            </div>
            <div className="about-author-container">
              <h3>About Author</h3>
              <div className="about-author d-flex p-4 bg-light">
                <div className="bio">
                  <img
                    src="https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708300800&semt=ais"
                    alt="Image placeholder"
                    className="img-fluid mb-4"
                  />
                </div>
                <div className="desc">
                  <h3>Mr. Yogesh Kadam</h3>
                  <p>Diabetologist </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ducimus itaque, autem necessitatibus voluptate quod mollitia
                    delectus aut, sunt placeat nam vero culpa sapiente
                    consectetur similique, inventore eos fugit cupiditate
                    numquam!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogText; // Export the BlogText component
