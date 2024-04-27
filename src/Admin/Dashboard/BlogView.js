import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const BlogView = () => {
  const { userData } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);

  async function fetchBlogs() {
    try {
      const res = await axios.get(`https://pdc-backend-mg9n.onrender.com/api/blogs/fetchallblogs`, {
        headers: { 'auth-token': userData.token },
      });
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`https://pdc-backend-mg9n.onrender.com/api/blogs/deleteblog/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="admin">
      <div className="text-end">
        <Link to="/admin/addblog" className="btn btn-primary mb-3 me-5">
          Add Blog
        </Link>
      </div>

      <h1 className="table-heading text-center m-2">Blogs</h1>

      <div className="container">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>File</th>
              <th>Image</th>
              <th>Date</th>
              {/* <th>Edit</th> */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>
                  <a href={blog.file} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
                <td>
                  <img src={blog.image} alt="Blog" className="img-fluid" />
                </td>
                <td>{new Date(blog.date).toLocaleDateString()}</td>
                {/* <td>
                  <Link to={`/admin/editblog/${blog._id}`}>
                    <FaEdit />
                  </Link>
                </td> */}
                <td>
                  <button onClick={() => deleteBlog(blog._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogView;
