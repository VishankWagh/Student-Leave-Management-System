import { useEffect, useState } from 'react';
import Count from '../../components/Count';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import '../../styles/Table.css';

const Dashboard = () => {
    const [list, setList] = useState([]);
    const [counts, setCounts] = useState({});

    const mentor_id = "202";

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCounts = async () => {
            const appRes = await axios.get(`http://localhost:3000/getappcount/${mentor_id}`);
            const penRes = await axios.get(`http://localhost:3000/getpencount/${mentor_id}`);
            const rejRes = await axios.get(`http://localhost:3000/getrejcount/${mentor_id}`);
            if (appRes.data.success) setCounts({
                appr: appRes.data.appr,
                pend: penRes.data.pend,
                rejc: rejRes.data.rejc
            });
            else console.log("err");
        }

        const fetchLeaveList = async () => {
            const res = await axios.get(`http://localhost:3000/getleaves/${mentor_id}`);
            console.log('d ', res.data.list[0]);
            if (res.data.success) setList(res.data.list);
            else console.log("err");
        }

        fetchCounts();
        fetchLeaveList();
    }, []);


    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dash-counts">
                {/* <Count title="Available Leave Types" count="12" desc="Leave Types" />
                <Count title="Available Leave Types" count="12" desc="Leave Types" />
                <Count title="Available Leave Types" count="12" desc="Leave Types" /> */}
                <div className="counts-row">
                    <Count title='Approved Leaves' count={counts.appr} desc='approved' />
                    <Count title='Pending Leaves' count={counts.pend} desc='pending' />
                    <Count title='Rejected Leaves' count={counts.rejc} desc='rejected' />
                </div>
                <div className="counts-row">
                    <Count title='Approved Leaves' count={counts.appr} desc='approved' />
                    <Count title='Pending Leaves' count={counts.pend} desc='pending' />
                    <Count title='Rejected Leaves' count={counts.rejc} desc='rejected' />
                </div>
            </div>
            <div className="leave-tbl">
                <h2>Today's Leave Applications</h2>
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
        </div>
    );
}

export default Dashboard;