import React,{useEffect,useContext} from 'react'
import Home from './Dashboard/Home'
import Login from './Dashboard/Login'
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';


const Index = () => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  const isUserLoggedIn = userData.token !== undefined;
  

  return (
   <>
    <div>
      {isUserLoggedIn  ? (
        <>
          <h1>hi</h1>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
   </>
  )
}

export default Index
