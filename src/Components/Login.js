import React, { useContext, useState } from 'react'
import AlertContext from '../context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom';
const helperFunction = require('../helpers/CommonFunction');

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const handleClick = async (event) => {
        try {
            event.preventDefault();

            let requestConfig = {
                email: credentials.email,
                password: credentials.password
            };

            let result = await helperFunction.postAPICall({
                url: 'api/login',
                data: requestConfig
            });

            if (result.status === 200) {
                localStorage.setItem('accessToken', result.data.access_token);
                setCredentials({ email: '', password: '' });
                showAlert(result.msg, "success");
                navigate('/');
            } else {
                console.log(result.msg);
                showAlert(result.msg, "danger");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className='mt-3'>
            <h2>Login to continue to iNoteBook</h2>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login