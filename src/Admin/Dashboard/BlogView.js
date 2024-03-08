import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom';
import AddBlog from './AddBlog';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from 'bootstrap';


const BlogView = () => {
  const { userData } = useContext(UserContext);
  const [blogs, setblogs] = useState([]);

  async function fetchblogs() {
    const res = await axios.get(
      `http://localhost:5000/api/blogs/fetchallblogs`,
      {
        headers: { "auth-token": userData.token },
      }
    );
    //console.log(res.data);
    setblogs(res.data);
  }

  useEffect(() => {
    fetchblogs();
  }, []);

  //console.log(blogs);

  const deleteNote = async (id) => {
    const response = await fetch(`http://localhost:5000/api/blogs/deleteblog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    //console.log("deleted" + id);
    fetchblogs();
  }


  return (
    <>
      
      <div className='admin'>
        <div className='text-end'>
        <Link to="/admin/addblog" className="btn btn-primary mb-3 me-5">Add Blog</Link>
        </div>
     
      <h1 className='table-heading  text-center m-2'> Blogs </h1>
      
      <div className='container '>
      <table className="table  table-striped table-bordered ">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={index}>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td>{blog.image}</td>
              <td>{new Date(blog.date).toLocaleDateString()}</td>
              <td><button><FaEdit  /></button></td>
              <td><button onClick={()=>{ deleteNote(blog._id)}}> <MdDelete  / > </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}

export default BlogView
