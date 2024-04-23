import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AddService = () => {

    const navigate = useNavigate();

    const [service, setservice] = useState({ name: "", description: "", image: "", servicetype: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        
        // Create FormData object
        const formData = new FormData();
        formData.append('name', service.name);
        formData.append('description', service.description);
        formData.append('servicetype', service.servicetype); // Append the servicetype
        formData.append('image', service.image); // Append the file
    
        try {
            const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/service/addservice`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData // Use FormData as the body
            });
            const res = await response.json();
            setservice({ name: "", description: "", image: "", servicetype: "" });
            navigate('/admin/service');
        } catch (error) {
            console.error("Error adding service:", error);
            // Handle error
        }
    }
    
    const onChange = (e) => {
        if (e.target.name === 'image') {
            // Get the selected file
            const file = e.target.files[0];
            // Update the service state with the selected file
            setservice({ ...service, [e.target.name]: file });
        } else {
            // For other input fields, update the service state with the input value
            setservice({ ...service, [e.target.name]: e.target.value });
        }
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
                            <label className="label" for="password">Description</label>
                            <input type="text" name="description" value={service.description} className="form-control" placeholder="Description" required onChange={onChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="label" for="servicetype">Service Type</label>
                            <select name="servicetype" className="form-control" value={service.servicetype} onChange={onChange}>
                                <option value="">Select Service Type</option>
                                <option value="Regular">Regular</option>
                                <option value="Value Added">Value added</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label className="label" for="password">Image</label>
                            <input type="file" name="image" className="form-control" placeholder="image" required onChange={onChange} />
                        </div>
                    </form>
                    <div className="text-center">
                        <button disabled={service.name.length < 5 || service.description.length < 5 || service.servicetype === ""} type="submit" className=" btn btn-danger rounded submit px-3" onClick={handleClick}>Add Service</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddService;
