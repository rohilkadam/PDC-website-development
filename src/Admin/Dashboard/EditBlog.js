
import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import UserContext from '../../context/UserContext'

const EditBlog = () => {
  const { userData } = useContext(UserContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `https://pdc-backend-mg9n.onrender.com/api/blogs/fetchblog/${id}`,
        {
          headers: { "auth-token": userData.token },
        }
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Update state with the new values
    await setTitle(e.target.value);
    await setDescription(e.target.value);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    console.log(formData);

    if (id) {
      try {
        const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/blogs/updateblog/${id}`, {
          method: 'PUT',
          headers: {
            'auth-token': localStorage.getItem('token')
          },
          body: formData
        });
        const res = await response.json();
        navigate('/admin/blogs');
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    }
  }

  return (
    <div className="admin">
      <div className='container shadow p-3 w-75'>
        <h1 className='table-heading fw-bold text-danger text-center m-2'>Edit Blog</h1>
        <form className='p-5'>
          <div className="form-group mb-3">
            <label className="label" htmlFor="title">Title</label>
            <input type="text" name="title" className="form-control" placeholder="Title" required onChange={(e) => setTitle(e.target.value)} value={title} />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="description">Description</label>
            <input type="text" name="description" className="form-control" placeholder="Description" required onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
        </form>
        <div className="text-center">
          <button disabled={title.length < 5 || description.length < 5} type="submit" className="btn btn-danger rounded submit px-3" onClick={handleClick}>Update Blog</button>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
