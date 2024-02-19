import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Table.css';

const Pending = () => {

    const [pLeaves, setPLeaves] = useState([]);

    const navigate = useNavigate();

    const mentor_id = "202";

    useEffect(() => {
        async function load() {
            const res = await axios.get(`http://localhost:3000/pendingleaves/${mentor_id}`);
            const pl = res.data.leavesList;
            setPLeaves(pl);
        }
        load();
    }, []);

    return (
        <div className='pending m-auto'>
            <h1>Pending Leaves</h1>
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
                    {pLeaves.map((leave, index) => {
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

export default Pending;
