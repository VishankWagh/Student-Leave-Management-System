import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Table.css';

const LeaveHistory = () => {
    const [list, setList] = useState([]);

    const navigate = useNavigate();

    const mentor_id = "202";

    useEffect(() => {

        const fetchLeaveList = async () => {
            const res = await axios.get(`http://localhost:3000/getleaves/${mentor_id}`);
            console.log('d ', res.data.list[0]);
            if (res.data.success) setList(res.data.list);
            else console.log("err");
        }
        fetchLeaveList();
    }, []);
    return (
        <div className="leave-hist">
            <h1>Leave History</h1>
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>STUDENT ID</th>
                        <th>FULL NAME</th>
                        <th>LEAVE TYPE</th>
                        <th>APPLIED ON</th>
                        <th>CURRENT STATUS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>A12</td>
                        <td>Raj Garg</td>
                        <td>Casual Leave</td>
                        <td>12-23-34</td>
                        <td>Approved</td>
                        <td>
                            <button className='view-dets-btn'>View Details</button>
                        </td>
                    </tr>
                    {list.map((leave, ind) => {
                        return (
                            <tr>
                                <td>1</td>
                                <td>{leave.id}</td>
                                <td>Raj Garg</td>
                                <td>{leave.leave_type}</td>
                                <td>{leave.issue_date}</td>
                                <td>{leave.status == 1 ? "Approved" : (leave.status == 2 ? "Rejected" : "Pending")}</td>
                                <td>
                                    <button className='view-dets-btn' onClick={() => navigate(`/mentor/studentdets?studId=${leave.student_id}&leaveId=${leave.id}`)}>View Details</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default LeaveHistory;