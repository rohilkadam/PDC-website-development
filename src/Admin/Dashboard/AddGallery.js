import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

const AddGallery = () => {

    const navigate = useNavigate();


    const [image, setimage] = useState({ category: "", image: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        
        // Create FormData object
        const formData = new FormData();
        formData.append('category', image.category);
        formData.append('image', image.image); // Append the file
    
        try {
            const response = await fetch(`http://localhost:5000/api/gallery/addGallery`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData // Use FormData as the body
            });
            const res = await response.json();
            setimage({ category: "", image: "" });
            navigate('/admin/image');
        } catch (error) {
            console.error("Error adding image:", error);
            // Handle error
        }
    }
    
    const onChange = (e) => {
        if (e.target.name === 'image') {
            // Get the selected file
            const file = e.target.files[0];
            // Update the image state with the selected file
            setimage({ ...image, [e.target.name]: file });
        } else {
            // For other input fields, update the image state with the input value
            setimage({ ...image, [e.target.name]: e.target.value });
        }
    }
    

    return (
        <>

            <div className="admin">
                <div className='container shadow p-3 w-75'>
                <h1 className='table-heading fw-bold text-danger text-center m-2'>Add image </h1>
                <form className='p-5'>
                    <div className="form-group mb-3">
                        <label className="label" for="name">Category</label>
                        <input type="text" name="category" className="form-control" placeholder="title" required onChange={onChange} value={image.category} />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label className="label" for="password">Image</label>
                        <input type="file" name="image"  className="form-control" placeholder="image" required onChange={onChange} />
                    </div>

                </form>

                <div className="text-center">

                    <button type="submit" className=" btn btn-danger rounded submit px-3" onClick={handleClick}>Add image</button>
                </div>
                </div>

            </div>



        </>
    )
}

export default AddGallery
