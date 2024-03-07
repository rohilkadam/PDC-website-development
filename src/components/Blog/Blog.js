import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Blog.css';
import blogData from '../Data/blogs.js';
import BlogText from './BlogText.js';

function Blog() {

  return (
    <>
    <div className="body">
      <div className="blog-posts">
      
        
        <div  className="container">
        <h2>Blogs</h2>
        <div className="row">
        {blogData.map(post => (
          
          <div key={post.id} className="col-lg-4 blog-post blog-card  shadow">
            <img src={post.image} alt="" className="card-img-top"/>
            <div className="card-body">
            <h5 className="card-title ">{post.title}</h5>
            <span><button className="btn btn-danger btn-sm">Poona Diabetes Center</button> <button className="right-btn btn btn-dark   btn-sm">12th Feb 2024</button> </span>
            <p className="card-text">{post.content}</p>
            <Link to={`/blog/${post.id}`} className="btn btn-outline-primary">Read More</Link>
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
