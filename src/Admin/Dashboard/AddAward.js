import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AddAward = () => {
    const navigate = useNavigate();

    const [award, setAward] = useState({ name: "", issuedBy: "", description: "", image: ""});

    const handleClick = async (e) => {
        e.preventDefault();

        // Create FormData object
        //console.log(award);
        const formData = new FormData();
        formData.append('name', award.name);
        formData.append('issuedBy', award.issuedBy);
        formData.append('description', award.description);
        formData.append('image', award.image);

        //console.log(formData);

        try {
            const response = await fetch(`https://pdc-backend-mg9n.onrender.com/api/award/addaward`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            });
            const res = await response.json();
            setAward({ name: "", issuedBy: "", description: "", image: "" });
            navigate('/admin/award');
        } catch (error) {
            console.error("Error adding award:", error);
            // Handle error
        }
    }

    const onChange = (e) => {
        if (e.target.name === 'image') {
            setAward({ ...award, [e.target.name]: e.target.files[0] });
        } else {
            setAward({ ...award, [e.target.name]: e.target.value });
        }
    }

    return (
        <div className="admin">
            <div className='container shadow p-3 w-75'>
                <h1 className='table-heading fw-bold text-danger text-center m-2'>Add Award </h1>
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
                        <input type="file" name="image" className="form-control" required onChange={onChange} />
                    </div>
                </form>
                <div className="text-center">
                    <button disabled={award.name.length < 5 || award.description.length < 5} type="submit" className="btn btn-danger rounded submit px-3" onClick={handleClick}>Add Award</button>
                </div>
            </div>
        </div>
    );
}

export default AddAward;
