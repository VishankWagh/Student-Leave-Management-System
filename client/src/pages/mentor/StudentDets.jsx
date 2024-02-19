import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Table.css';

const StudentDets = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const leaveId = urlParams.get('leaveId');
    const studId = urlParams.get('studId');

    const [leaveDets, setLeaveDets] = useState('');
    const [studDets, setStudDets] = useState('');

    useEffect(() => {
        async function fetchDets() {
            const leaveDetsRes = await axios.get(`http://localhost:3000/leavedets/${leaveId}`);
            const studDetsRes = await axios.get(`http://localhost:3000/studdets/${studId}`);
            // if (leaveDetsRes.data.success) {
            console.log("lv fr", leaveDetsRes.data.leaveDets);
            console.log("st fr", studDetsRes.data.studDets);
            setLeaveDets(leaveDetsRes.data.leaveDets);
            setStudDets(studDetsRes.data.studDets);
            // setLeaveDets({ ...result.data.leaveDets, ...result.data.StudentDets });
            // }
        }
        fetchDets();
    }, []);

    return (
        <div className='student-dets m-auto'>
            <h1>Student Details</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Enrollment no.</th>
                        <td>{studDets.enrl_no}</td>
                    </tr>
                    <tr>
                        <th>Full Name</th>
                        <td>{studDets.name}</td>
                    </tr>
                    <tr>
                        <th>Institute</th>
                        <td>{studDets.inst_id}</td>
                    </tr>
                    <tr>
                        <th>Division</th>
                        <td>{studDets.division}</td>
                    </tr>
                    <tr>
                        <th>Leave Type</th>
                        <td>{leaveDets.leave_type}</td>
                    </tr>
                    <tr>
                        <th>From</th>
                        <td>{leaveDets.from_date}</td>
                    </tr>
                    <tr>
                        <th>To</th>
                        <td>{leaveDets.to_date}</td>
                    </tr>
                    <tr>
                        <th>Applied On</th>
                        <td>{leaveDets.issue_date}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{leaveDets.status == 1 ? "Approved" : (leaveDets.status == 2 ? "Rejected" : "Pending")}</td>
                    </tr>
                    <tr>
                        <th>Actions</th>
                        <td>
                            <button className='action-btn app-btn'>Approve</button>
                            <button className='action-btn rej-btn'>Reject</button>
                        </td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentDets
