import React, { useContext } from 'react'
import "../admin.css"
import { MdDashboard } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { TbMessage2Star } from "react-icons/tb";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const AdminNavbar = () => {
  const Navigate = useNavigate();
  const {userData, setUserData } = useContext(UserContext)

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData({token:undefined, user: undefined});
    Navigate('/admin');
}

  return (
    <>
    
<header className='adminNav'>
  
  <nav
       id="sidebarMenu"
       class="collapse d-lg-block sidebar collapse bg-white"
       >
    <div class="position-sticky">
      <div class="list-group list-group-flush mx-3 mt-4">
        <Link
           to="/admin"
           class="list-group-item list-group-item-action py-3 ripple active"
           aria-current="true"
           >
            <MdDashboard />
          <span>Main dashboard</span>
        </Link>
        <Link
           to="/admin/blogs"
           class="list-group-item list-group-item-action py-3 ripple "
           >
          <FaBloggerB />
            <span>Blogs</span>
        </Link>
        <Link
           to="/admin/award"
           class="list-group-item list-group-item-action py-3 ripple "
           >
          <FaAward />
            <span>Awards</span>
         </Link>
         <Link
           to="/admin/testimonial"
           class="list-group-item list-group-item-action py-3 ripple "
           >
          <TbMessage2Star />
            <span>Testimonials</span>
         </Link>

         <Link
           to="/admin/image"
           class="list-group-item list-group-item-action py-3 ripple "
           >
          <TbMessage2Star />
            <span>Gallery Images</span>
         </Link>
        
        
      </div>
    </div>
  </nav>
  
  <nav
       id="main-navbar"
       class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow"
       >
   <div class="container-fluid">

     
      <Link class="navbar-brand align-items-center" to="#">
        <img
             src="images/logo.png"
             height="35"
             width="35"
             className='mx-3'
             />
        <span className='fw-bold'>PDC</span>
      </Link>
     
      

      
      <ul class="navbar-nav ms-auto d-flex flex-row">


        <li>
        {localStorage.getItem('token') ? <button onClick={handleLogout} className='btn btn-danger shadow'>Logout</button>  : <button></button>}
          
        </li>
      </ul>
    </div>
    
  </nav>
  
</header>


    </>
  )
}

export default AdminNavbar