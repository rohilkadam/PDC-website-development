import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom';
import AddService from './AddService';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from 'bootstrap';


const ServiceView = () => {
  const { userData } = useContext(UserContext);
  const [services, setservices] = useState([]);

  async function fetchservices() {
    const res = await axios.get(
      `https://pdc-backend-mg9n.onrender.com/api/service/fetchallservices`,
      {
        headers: { "auth-token": userData.token },
      }
    );
    //console.log(res.data);
    setservices(res.data);
  }

  useEffect(() => {
    fetchservices();
  }, []);

  //console.log(blogs);

  const deleteNote = async (id) => {
    const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/service/deleteservice/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    //console.log("deleted" + id);
    fetchservices();
  }


  return (
    <>
      
      <div className='admin'>
        <div className='text-end'>
        <Link to="/admin/addservice" className="btn btn-primary mb-3 me-5">Add Service</Link>
        </div>
     
      <h1 className='table-heading  text-center m-2'> Services </h1>
      
      <div className='container '>
      <table className="table  table-striped table-bordered ">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td><img src={service.image} className='img-fluid' /></td>
              <td>{service.servicetype}</td>
              <td><button><FaEdit  /></button></td>
              <td><button onClick={()=>{ deleteNote(service._id)}}> <MdDelete  / > </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}

export default ServiceView
