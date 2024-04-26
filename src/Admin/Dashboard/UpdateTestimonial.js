import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const UpdateTestimonial = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [testimonial, setTestimonial] = useState({ name: "", image: "", feedback:""});

    useEffect(() => {
        // Fetch Testimonial details based on the ID when component mounts
        fetchTestimonialDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchTestimonialDetails = async () => {
        try {
            const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/testimonial/fetchtestimonial/${id}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setTestimonial(data); // Set Testimonial details from the fetched data
        } catch (error) {
            console.error("Error fetching testimonial details:", error);
            // Handle error
        }
    };

    
    const handleClick = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', testimonial.name);
        formData.append('feedback', testimonial.issuedBy);
    
        // Append image only if it's not null
        if (testimonial.image) {
            formData.append('image', testimonial.image);
        }
    
        try {
            const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/testimonial/updatetestimonial/${id}`, {
                method: 'PUT',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            });
            const res = await response.json();
            navigate('/admin/testimonial');
        } catch (error) {
            console.error("Error updating Testimonial:", error);
            // Handle error
        }
    };
    

    const onChange = (e) => {
        if (e.target.name === 'image') {
            setTestimonial({ ...testimonial, [e.target.name]: e.target.files[0] });
        } else {
            setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="admin">
            <div className='container shadow p-3 w-75'>
                <h1 className='table-heading fw-bold text-danger text-center m-2'>Update Testimonial </h1>
                <form className='p-5'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control" placeholder="Name" required onChange={onChange} value={testimonial.name} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="description">Feedback</label>
                        <input type="text" name="description" value={testimonial.feedback} className="form-control" placeholder="Feedback" required onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="image">Image</label>
                        <input type="file" name="image"  className="form-control"  onChange={onChange} />
                    </div>
                </form>
                <div className="text-center">
                    <button type="submit" className="btn btn-danger rounded submit px-3" onClick={handleClick}>Update Testimonial</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateTestimonial;
