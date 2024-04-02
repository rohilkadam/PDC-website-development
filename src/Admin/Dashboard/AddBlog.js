import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

const AddBlog = () => {

    const navigate = useNavigate();


    const [blog, setblog] = useState({ title: "", description: "", image: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        
        // Create FormData object
        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('description', blog.description);
        formData.append('image', blog.image); // Append the file
    
        try {
            const response = await fetch(`http://localhost:5000/api/blogs/addblog`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData // Use FormData as the body
            });
            const res = await response.json();
            setblog({ title: "", description: "", image: "" });
            navigate('/admin/blogs');
        } catch (error) {
            console.error("Error adding blog:", error);
            // Handle error
        }
    }
    
    const onChange = (e) => {
        if (e.target.name === 'image') {
            // Get the selected file
            const file = e.target.files[0];
            // Update the blog state with the selected file
            setblog({ ...blog, [e.target.name]: file });
        } else {
            // For other input fields, update the blog state with the input value
            setblog({ ...blog, [e.target.name]: e.target.value });
        }
    }
    

    return (
        <>

            <div className="admin">
                <div className='container shadow p-3 w-75'>
                <h1 className='table-heading fw-bold text-danger text-center m-2'>Add Blog </h1>
                <form className='p-5'>
                    <div className="form-group mb-3">
                        <label className="label" for="name">Title</label>
                        <input type="text" name="title" className="form-control" placeholder="title" required onChange={onChange} value={blog.title} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" for="password">Description</label>
                        <input type="text" name="description" value={blog.description} className="form-control" placeholder="Description" required onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" for="password">Image</label>
                        <input type="file" name="image"  className="form-control" placeholder="image" required onChange={onChange} />
                    </div>

                </form>

                <div className="text-center">

                    <button disabled={blog.title.length < 5 || blog.description.length < 5} type="submit" className=" btn btn-danger rounded submit px-3" onClick={handleClick}>Add blog</button>
                </div>
                </div>

            </div>



        </>
    )
}

export default AddBlog
