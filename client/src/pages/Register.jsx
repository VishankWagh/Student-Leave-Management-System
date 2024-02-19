import react, { useState } from 'react';
import '../styles/Form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [sName, setSName] = useState('');
    const [enrlNo, setEnrlNo] = useState('');
    const [pswd, setPswd] = useState('');
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    async function sendData(e) {
        e.preventDefault();
        console.log("onclk");
        const result = await axios.post('http://localhost:3000/register', {
            sName, enrlNo, pswd
        });
        setSName('');
        setEnrlNo('');
        setPswd('');
        console.log("re ", result);
        if (result.data.success) {
            navigate('/');
        }
        else setMsg("Registration Failed");
    }

    return (
        <div className="register form-container">
            <form action="" className='registerForm form'>
                <h1>Register</h1>
                <div className="inp">
                    <label htmlFor="sName">Full Name: </label>
                    <input type="text" name="sName" id="sName" value={sName} onChange={(e) => setSName(e.target.value)} />
                </div>
                <div className="inp">
                    <label htmlFor="enrlNo">Enrollment No.: </label>
                    <input type="text" name="enrlNo" id="enrlNo" value={enrlNo} onChange={(e) => setEnrlNo(e.target.value)} />
                </div>
                <div className="inp">
                    <label htmlFor="pswd">Password: </label>
                    <input type="password" name="pswd" id="pswd" value={pswd} onChange={(e) => setPswd(e.target.value)} />
                </div>
                <div className="inp">
                    <input type="submit" value="Submit" onClick={(e) => sendData(e)} />
                </div>
                <div className="msg">{msg}</div>
            </form>
        </div>
    )
}

export default Register;