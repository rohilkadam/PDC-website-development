import React, { useState, useEffect } from 'react';
import './Blog.css';
import blogData from '../../Data/blogs';

function Blog() {
  



  return (
    <>
    <div className="body">
      <div className="blog-posts">
      
        
        <div className="container">
        <h2>Blogs</h2>
        <div className="row">
        {blogData.map(post => (
          
          <div key={post.id} className="col-lg-4 blog-post  shadow">
            <img src={post.image} alt="" className="card-img-top"/>
            <div className="card-body">
            <h5 className="card-title ">{post.title}</h5>
            <span><button className="btn btn-danger btn-sm">Poona Diabetes Center</button> <button className="right-btn btn btn-dark   btn-sm">12th Feb 2024</button> </span>
            <p className="card-text">{post.content}</p>
            <a href="#" className="btn btn-outline-primary">Read More</a>
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
