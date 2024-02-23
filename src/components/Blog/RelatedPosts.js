import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './RelatedPosts.css';
import blogData from '../../Data/blogs';
import BlogText from './BlogText.js';
function RelatedPosts({postId}) {
 
  const post = blogData.find(post => post.id === postId);
  const rel=post.related;
  const relatedPosts = blogData.filter(post => rel.includes(post.id));
  
  return (
    <>
    
      <div className="related-posts">
      
        
        <div  className="container">
        <h3>Related Posts</h3>
        <div className="row">
        {relatedPosts.map(post => (
          
          <div key={post.id} className="col-lg-12 blog-post  shadow">
            <img src={post.image} alt="" className="card-img-top"/>
            <div className="card-body">
            <h5 className="card-title ">{post.title}</h5>
            <Link to={`/blog/${post.id}`} className="btn btn-outline-primary">Go to Blog</Link>
            </div>
          </div>
        ))}
        </div>
      </div>
      </div>
      
    </>
  );
}

export default RelatedPosts;
