import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { Button } from 'bootstrap';


const MessageView = () => {
  const { userData } = useContext(UserContext);
  const [messages, setmessages] = useState([]);

  async function fetchmessages() {
    const res = await axios.get(
      `https://pdc-backend-mg9n.onrender.com/api/message/fetchallmessages`,
      {
        headers: { "auth-token": userData.token },
      }
    );
    //console.log(res.data);
    setmessages(res.data);
  }

  useEffect(() => {
    fetchmessages();
  }, []);

  //console.log(blogs);

  const deleteMessage = async (id) => {
    const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/message/deletemessage/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = response.json();
    //console.log("deleted" + id);
    fetchmessages();
  }


  return (
    <>
      
      <div className='admin'>
        
     
      <h1 className='table-heading  text-center m-2'> Messages </h1>
      
      <div className='container '>
      <table className="table  table-striped table-bordered ">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.subject}</td>
              <td>{message.message}</td>
              <td><button onClick={()=>{ deleteMessage(message._id)}}> <MdDelete  / > </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  )
}

export default MessageView
