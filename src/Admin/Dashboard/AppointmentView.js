import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { Button } from 'bootstrap';


const AppointmentView = () => {
  const { userData } = useContext(UserContext);
  const [appointments, setappointments] = useState([]);

  async function fetchappointments() {
    const res = await axios.get(
      `http://localhost:5000/api/appointment/fetchallappointments`,
      {
        headers: { "auth-token": userData.token },
      }
    );
    //console.log(res.data);
    setappointments(res.data);
  }

  useEffect(() => {
    fetchappointments();
  }, []);

  //console.log(blogs);

  const deleteAppointment = async (id) => {
    const response = await fetch(`http://localhost:5000/api/appointment/deleteappointment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    //console.log("deleted" + id);
    fetchappointments();
  }


  return (
    <>
      
      <div className='admin'>
        
     
      <h1 className='table-heading  text-center m-2'> Appointments </h1>
      
      <div className='container '>
      <table className="table  table-striped table-bordered ">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Date</th>
            <th>Time Slot Start</th>
            <th>Time Slot End</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.age}</td>
              <td>{appointment.mobile}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.date}</td>
              <td>{appointment.timeSlotStart}</td>
              <td>{appointment.timeSlotEnd}</td>
              <td><button onClick={()=>{ deleteAppointment(appointment._id)}}> <MdDelete  / > </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}

export default AppointmentView
