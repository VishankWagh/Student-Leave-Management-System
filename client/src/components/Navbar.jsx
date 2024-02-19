import react from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <div className="navlink nav-logo">
                    <Link to='/'>SLMS</Link>
                </div>
                <div className="navlink">
                    <Link to='/login'>Login</Link>
                </div>
                <div className="navlink">
                    <Link to='/register'>Register</Link>
                </div>
                <div className="navlink">
                    <Link to='mentor/dashboard'>Dashboard</Link>
                </div>
                <div className="navlink">
                    <Link to='mentor/pending'>Pending</Link>
                </div>
                <div className="navlink">
                    <Link to='mentor/approved'>Approved</Link>
                </div>
                <div className="navlink">
                    <Link to='mentor/rejected'>Rejected</Link>
                </div>
                <div className="navlink">
                    <Link to='mentor/leavehistory'>LeaveHistory</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar; 