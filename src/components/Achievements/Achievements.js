import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Awards from '../Home/Awards'
import AwardsData from '../Data/AwardsData'

const Achievements = () => {
  const [awardData, setawardData] = useState([]);

  async function fetchawards() {
    const res = await axios.get(
      `http://localhost:5000/api/award/fetchallawards`
    );
    
    setawardData(res.data);
  }

  useEffect(() => {
    fetchawards();
  }, []);
  return (
    <>
    <div className='body'>
     <div className='container row m-auto mt-5'>
     {awardData.map((index,i)=>(
                           
                                <div class=" col-md-4 card card-award my-3" key={i}>
                                    <img class="card-img rounded-0" src={index.img} alt="" />
                                    <div class="card-award__body text-center">
                                        <h3>{index.name}</h3>
                                        <p>{index.by}</p>
                                        <div class="award-footer d-flex justify-content-between">
                                            <p>
                                                {index.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            
                        ))}
     </div>
     </div>
    </>
  )
}

export default Achievements
