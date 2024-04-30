import React from 'react'
import './Hp.css'
import Accordian from './Accordian'

const HealthPackage = () => {
  return (
    <>
    <div className='body'>
      <div className='container'>
      <div class="alert alert-info" role="alert">
    To know more about the details and prices of the packages, kindly contact/visit the Centre.
    </div>
      </div>
    
    <Accordian />
    </div>
    
    </>
  )
}

export default HealthPackage
