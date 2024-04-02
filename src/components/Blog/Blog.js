import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Blog.css';
// import blogData from '../Data/blogs.js';
import BlogText from './BlogText.js';

function Blog() {
  const [blogData, setblogData] = useState([]);

  async function fetchblogs() {
    const res = await axios.get(
      `http://localhost:5000/api/blogs/fetchallblogs`
    );
    
    setblogData(res.data);
    
  }

  useEffect(() => {
    fetchblogs();
  }, []);

  return (
    <>
    <div className="body">
      <div className="blog-posts">
      
        
        <div  className="container">
        <h2>Blogs</h2>
        <div className="row">
        {blogData.map(post => (
          
          <div key={post._id} className="col-lg-4 blog-post blog-card  shadow">
            <img src={post.image} alt="" className="card-img-top"/>
            <div className="card-body">
            <h5 className="card-title ">{post.title}</h5>
            <span><button className="btn btn-danger btn-sm">Poona Diabetes Center</button> <button className="right-btn btn btn-dark   btn-sm">12th Feb 2024</button> </span>
            
            <Link to={`/blogs/${post._id}`} className="btn btn-outline-primary">Read More</Link>
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

export default Blog;
