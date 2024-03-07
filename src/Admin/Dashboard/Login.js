import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Login = (props) => {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            setUserData({
                token: json.authToken,
                user: "iojo"
            });
            navigate('/admin');
        } else {
            // Handle error
        }
    }

    return (
        <section className="">
            <div className="container bg-light-subtle shadow w-75 mx-auto">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="wrap d-md-flex">
                            <div className="img" style={{ backgroundImage: `url(https://www.auis.edu/wp-content/uploads/2019/09/rs261_157781379-low.jpg)` }}></div>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Log-In To PDC Admin</h3>
                                    </div>
                                </div>
                                <form className="signin-form" onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="name">Username</label>
                                        <input type="text" name="email" className="form-control" placeholder="Username" required value={credentials.email} onChange={onChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" placeholder="Password" required value={credentials.password} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="text-md-right">
                                            <Link to="#">Forgot Password</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
