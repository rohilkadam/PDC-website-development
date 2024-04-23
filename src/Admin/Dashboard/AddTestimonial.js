import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AddTestimonial = () => {
    const navigate = useNavigate();

    const [testimonial, setTestimonial] = useState({ name: "", image: "", feedback: "" });

    const handleClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', testimonial.name);
        formData.append('image', testimonial.image);
        formData.append('feedback', testimonial.feedback);

        try {
            const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/testimonial/addtestimonial`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            });

            const res = await response.json();
            setTestimonial({ name: "", image: "", feedback: "" });
            navigate('/admin/testimonial');
        } catch (error) {
            console.error("Error adding testimonial:", error);
            // Handle error
        }
    }

    const onChange = (e) => {
        if (e.target.name === 'image') {
            setTestimonial({ ...testimonial, [e.target.name]: e.target.files[0] });
        } else {
            setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
        }
    }

    return (
        <div className="admin">
            <div className='container shadow p-3 w-75'>
                <h1 className='table-heading fw-bold text-danger text-center m-2'>Add Testimonial </h1>
                <form className='p-5'>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control" placeholder="Name" required onChange={onChange} value={testimonial.name} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="image">Image</label>
                        <input type="file" name="image" className="form-control" required onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="feedback">Feedback</label>
                        <input type="text" name="feedback" className="form-control" placeholder="Feedback" required onChange={onChange} value={testimonial.feedback} />
                    </div>
                </form>
                <div className="text-center">
                    <button disabled={testimonial.name.length < 5 || testimonial.feedback.length < 5} type="submit" className="btn btn-danger rounded submit px-3" onClick={handleClick}>Add Testimonial</button>
                </div>
            </div>
        </div>
    );
}

export default AddTestimonial;
