import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const UpdateAward = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming you have a route parameter for the award ID

    const [award, setAward] = useState({ name: "", issuedBy: "", description: "", image: "" });

    useEffect(() => {
        // Fetch award details based on the ID when component mounts
        fetchAwardDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchAwardDetails = async () => {
        try {
            const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/award/fetchaward/${id}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setAward(data); // Set award details from the fetched data
        } catch (error) {
            console.error("Error fetching award details:", error);
            // Handle error
        }
    };

    
    const handleClick = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', award.name);
        formData.append('issuedBy', award.issuedBy);
        formData.append('description', award.description);
    
        // Append image only if it's not null
        if (award.image) {
            formData.append('image', award.image);
        }
    
        try {
            const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/award/updateaward/${id}`, {
                method: 'PUT',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            });
            const res = await response.json();
            navigate('/admin/award');
        } catch (error) {
            console.error("Error updating award:", error);
            // Handle error
        }
    };
    

    const onChange = (e) => {
        if (e.target.name === 'image') {
            setAward({ ...award, [e.target.name]: e.target.files[0] });
        } else {
            setAward({ ...award, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="admin">
            <div className='container shadow p-3 w-75'>
                <h1 className='table-heading fw-bold text-danger text-center m-2'>Update Award </h1>
                <form className='p-5'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control" placeholder="Name" required onChange={onChange} value={award.name} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="issuedBy">Issued By</label>
                        <input type="text" name="issuedBy" value={award.issuedBy} className="form-control" placeholder="Issued By" required onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="description">Description</label>
                        <input type="text" name="description" value={award.description} className="form-control" placeholder="Description" required onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="image">Image</label>
                        <input type="file" name="image"  className="form-control"  onChange={onChange} />
                    </div>
                </form>
                <div className="text-center">
                    <button type="submit" className="btn btn-danger rounded submit px-3" onClick={handleClick}>Update Award</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateAward;
