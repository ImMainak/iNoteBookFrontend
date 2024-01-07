import React, { useContext, useState } from 'react'
import AlertContext from '../context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom';
const helperFunction = require('../helpers/CommonFunction');

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirm_password: '' });
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (credentials.password === credentials.confirm_password) {
                let requestConfig = {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    confirm_password: credentials.confirm_password
                };

                let result = await helperFunction.postAPICall({
                    url: 'api/register',
                    data: requestConfig
                });

                if (result.status === 200) {
                    localStorage.setItem('accessToken', result.data.access_token);
                    setCredentials({ name: '', email: '', password: '', confirm_password: '' });
                    showAlert(result.msg, "success");
                    navigate('/');
                } else {
                    console.log(result.msg);
                    showAlert(result.msg, "danger");
                }
            } else {
                console.log("Not Match");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className='container mt-3'>
            <h2>Create an account to use iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm_password" name="confirm_password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup