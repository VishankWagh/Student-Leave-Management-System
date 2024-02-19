import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/Table.css';

const Rejected = () => {

    const [rLeaves, setRLeaves] = useState([]);

    const navigate = useNavigate();

    const mentor_id = "202";

    useEffect(() => {
        async function load() {
            const res = await axios.get(`http://localhost:3000/rejectedleaves/${mentor_id}`);
            const rj = res.data.leavesList;
            setRLeaves(rj);
        }
        load();
    }, []);

    return (
        <div className='rejected m-auto'>
            <h1>Rejected Leaves</h1>
            <table>
                <thead>
                    <tr>
                        <th>Sn.</th>
                        <th>Enrollment no.</th>
                        <th>Full Name</th>
                        <th>Leave Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Applied On</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>210510311005</td>
                        <td>Raj Ahir</td>
                        <td>Medical</td>
                        <td>21-1-24</td>
                        <td>29-1-24</td>
                        <td>21-1-24</td>
                        <td>Pending</td>
                        <td>
                            <button className='view-dets-btn'>View Details</button>
                        </td>
                    </tr>
                    {rLeaves.map((leave, index) => {
                        return (<tr>
                            <td>{leave.id}</td>
                            <td>210510311005</td>
                            <td>Raj Ahir</td>
                            <td>{leave.leave_type}</td>
                            <td>{leave.from_date}</td>
                            <td>{leave.to_date}</td>
                            <td>{leave.issue_date}</td>
                            <td>{leave.status}</td>
                            <td>
                                <button className='view-dets-btn' onClick={() => navigate(`/mentor/studentdets?studId=${leave.student_id}&leaveId=${leave.id}`)}>View Details</button>
                            </td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Rejected;
