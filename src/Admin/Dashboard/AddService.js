import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

const AddService = () => {

    const navigate = useNavigate();


    const [service, setservice] = useState({ name: "", description: "", image: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/service/addservice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(service)
        })
        const res = await response.json();
        setservice({ name: "", description: "", image: "" });
        navigate('/admin/service')
    }
    const onChange = (e) => {
        setservice({ ...service, [e.target.name]: e.target.value });
    }

    return (
        <>

            <div className="admin">
                <div className='container shadow p-3 w-75'>
                <h1 className='table-heading fw-bold text-danger text-center m-2'>Add Service </h1>
                <form className='p-5'>
                    <div className="form-group mb-3">
                        <label className="label" for="name">Name</label>
                        <input type="text" name="name" className="form-control" placeholder="name" required onChange={onChange} value={service.name} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" for="description">Description</label>
                        <input type="text" name="description" value={service.description} className="form-control" placeholder="Description" required onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" for="image">Image</label>
                        <input type="text" name="image" value={service.image} className="form-control" placeholder="image" required onChange={onChange} />
                    </div>

                </form>

                <div className="text-center">

                    <button disabled={service.name.length < 5 || service.description.length < 5} type="submit" className=" btn btn-danger rounded submit px-3" onClick={handleClick}>Add Service</button>
                </div>
                </div>

            </div>



        </>
    )
}

export default AddService
