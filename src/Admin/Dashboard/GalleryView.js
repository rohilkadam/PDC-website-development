import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom';
import AddGallery from './AddGallery';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from 'bootstrap';


const GalleryView = () => {
  const { userData } = useContext(UserContext);
  const [images, setimages] = useState([]);

  async function fetchimages() {
    const res = await axios.get(
      `http://localhost:5000/api/gallery/fetchallimages`,
      {
        headers: { "auth-token": userData.token },
      }
    );
    //console.log(res.data);
    setimages(res.data);
  }

  useEffect(() => {
    fetchimages();
  }, []);

  //console.log(images);

  const deleteImage = async (id) => {
    const response = await fetch(`http://localhost:5000/api/gallery/deleteGallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    //console.log("deleted" + id);
    fetchimages();
  }


  return (
    <>
      
      <div className='admin'>
        <div className='text-end'>
        <Link to="/admin/addimage" className="btn btn-primary mb-3 me-5">Add Image</Link>
        </div>
     
      <h1 className='table-heading  text-center m-2'> images </h1>
      
      <div className='container '>
      <table className="table  table-striped table-bordered ">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image, index) => (
            <tr key={index}>
              <td>{image.image}</td>
              <td>{image.category}</td>
              <td><button><FaEdit  /></button></td>
              <td><button onClick={()=>{ deleteImage(image._id)}}> <MdDelete  / > </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}

export default GalleryView
