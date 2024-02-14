import React from 'react'
import Items from './Items'
import HealthPackageData from '../../Data/HealthPackages';

const Accordian = () => {

    return (
        <>
            <div className='container box d-flex justify-content-center'>
                <div className='col-md-9 '>
                    <div class="accordion" id="accordionExample">
                        {HealthPackageData.map((i, index) => (
                            <div class="accordion-item" key={index}>
                                <h2 class="accordion-header my-2" id={`heading${index}`}>
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                        {i.name}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} class="accordion-collapse collapse my-3" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        {i.list.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                
                                                <h5 className='fw-bold mt-2 text-danger'>{item.heading}</h5>
                                                {/* Pass the itemlist to the Items component */}
                                                <Items items={item.itemlist} />
                                                
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Accordian