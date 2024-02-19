import react, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css'

function Login() {
    const [enrlNo, setEnrlNo] = useState('');
    const [pswd, setPswd] = useState('');
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const validate = async (e) => {
        e.preventDefault();
        const result = await axios.post('http://localhost:3000/login', {
            enrlNo,
            pswd
        });
        setMsg(result.data.message);
        if (result.data.success) {
            navigate('/');
        }
    }

    return (
        <div className="login form-container">
            <form action="" className='loginForm form'>
                <h1>Login</h1>
                <div className="inp">
                    <label htmlFor="enrlNo">Enrollment No.: </label>
                    <input type="text" name="enrlNo" id="enrlNo" value={enrlNo} onChange={(e) => setEnrlNo(e.target.value)} />
                </div>
                <div className="inp">
                    <label htmlFor="pswd">Password: </label>
                    <input type="password" name="pswd" id="pswd" value={pswd} onChange={(e) => setPswd(e.target.value)} />
                </div>
                <div className="inp">
                    <input type="submit" value="Submit" onClick={(e) => validate(e)} />
                </div>
                <div className="msg">{msg}</div>
            </form>
        </div>
    )
}

export default Login;