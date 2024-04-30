import React, { useContext } from 'react';
import Login from './Dashboard/Login';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import './admin.css'; 

const Index = () => {
  const { userData } = useContext(UserContext);
  const isUserLoggedIn = userData.token !== undefined;

  return (
    <div className="index-container">
      {isUserLoggedIn ? (
        <>
          <img src="images/slider1.jpg" alt="..." className="index-image" /> 
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
};

export default Index;
