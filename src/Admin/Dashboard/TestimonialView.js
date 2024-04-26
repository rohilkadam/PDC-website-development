import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom';
import AddTestimonial from './AddTestimonial';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from 'bootstrap';


const TestimonialView = () => {
  const { userData } = useContext(UserContext);
  const [testimonials, settestimonials] = useState([]);

  async function fetchtestimonials() {
    const res = await axios.get(
      `https://pdc-backend-mg9n.onrender.com/api/testimonial/fetchalltestimonials`,
      {
        headers: { "auth-token": userData.token },
      }
    );
    //console.log(res.data);
    settestimonials(res.data);
  }

  useEffect(() => {
    fetchtestimonials();
  }, []);

 

  const deleteNote = async (id) => {
    const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/testimonial/deletetestimonial/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    //console.log("deleted" + id);
    fetchtestimonials();
  }


  return (
    <>
      
      <div className='admin'>
        <div className='text-end'>
        <Link to="/admin/addtestimonial" className="btn btn-primary mb-3 me-5">Add Testimonial</Link>
        </div>
     
      <h1 className='table-heading  text-center m-2'> Testimonials </h1>
      
      <div className='container '>
      <table className="table  table-striped table-bordered ">
        <thead className="table-dark">
          <tr>  
            <th>Name</th>
            <th>Image</th>
            <th>Feedback</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial, index) => (
            <tr key={index}>
              <td>{testimonial.name}</td>
              <td>{testimonial.image}</td>
              <td>{testimonial.feedback}</td>
              <td>
              <Link to={`/admin/updatetestimonial/${testimonial._id}`}>
                      <button className="btn btn-primary"><FaEdit /></button>
              </Link>
              </td>
              <td><button onClick={()=>{ deleteNote(testimonial._id)}}> <MdDelete  / > </button></td>
            </tr>           
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}

export default TestimonialView
