import React from 'react'
import './Home.css'
import Banner from './Banner'
import Why_us from './Why_us'
import About from './About'
import Counts from './Counts'
import Testimonials from './Testimonials'
import Awards from './Awards'
import Services from './Services'

const Home = () => {
  return (
    <>
    <Banner />
    <Counts />
    <About />   
    <Services/>
    <Testimonials />
    <Awards />
    </>
  )
}

export default Home
