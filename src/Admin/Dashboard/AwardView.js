import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom';
import AddAward from './AddAward';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from 'bootstrap';


const AwardView = () => {
  const { userData } = useContext(UserContext);
  const [awards, setawards] = useState([]);

  async function fetchawards() {
    const res = await axios.get(
      `https://pdc-backend-mg9n.onrender.com/api/award/fetchallawards`,
      {
        headers: { "auth-token": userData.token },
      }
    );
    //console.log(res.data);
    setawards(res.data);
  }

  useEffect(() => {
    fetchawards();
  }, []);

 

  const deleteNote = async (id) => {
    const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/award/deleteaward/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    //console.log("deleted" + id);
    fetchawards();
  }


  return (
    <>
      
      <div className='admin'>
        <div className='text-end'>
        <Link to="/admin/addaward" className="btn btn-primary mb-3 me-5">Add Award</Link>
        </div>
     
      <h1 className='table-heading  text-center m-2'> Awards </h1>
      
      <div className='container '>
      <table className="table  table-striped table-bordered ">
        <thead className="table-dark">
          <tr>  
            <th>Name</th>
            <th>Issued By</th>
            <th>Description</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((award, index) => (
            <tr key={index}>
              <td>{award.name}</td>
              <td>{award.issuedBy}</td>
              <td>{award.description}</td>
              <td>{award.image}</td>
              <td>
              <Link to={`/admin/updateaward/${award._id}`}>
                      <button className="btn btn-primary"><FaEdit /></button>
              </Link>
              </td>
              <td><button onClick={()=>{ deleteNote(award._id)}}> <MdDelete  / > </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}

export default AwardView
