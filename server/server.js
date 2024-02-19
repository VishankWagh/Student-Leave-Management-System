import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'slms_db'
});

app.get('/', (req, res) => {
    const query = 'select * from users';
    db.query(query, (err, data) => {
        if (err) console.log("err: ", err);
        console.log(data);
        return res.send(data);
    })
});

app.post('/register', (req, res) => {
    const q = "insert into users (sName, enrlNo, pswd) values (?, ?, ?);";
    const { sName, enrlNo, pswd } = req.body;
    const values = [sName, enrlNo, pswd];
    db.query(q, values, (err, data) => {
        if (err) return console.log(err);
        res.status(200).send({
            success: true,
            message: "Inserted!!"
        });
    });
});

app.post('/login', (req, res) => {
    const q = 'select pswd from users where enrlNo=(?)';
    const values = [req.body.enrlNo];
    db.query(q, values, (err, data) => {
        if (err) return console.log(err);
        res.status(200).send({
            success: true,
            message: req.body.pswd === data[0].pswd ? 'Logged In Succeccfully' : 'Invalid Credential'
        });
    });
});

app.get('/getleaves/:ment_id', (req, res) => {
    const { ment_id } = req.params;
    const q = `select * from leave_table where mentor_id = ${ment_id} order by id desc limit 10`;
    db.query(q, (err, data) => {
        if (err) return console.log(err);
        // console.log("l", data);
        res.status(200).send({
            success: true,
            list: data
        });
    });
});

app.get('/getleavehistory/:ment_id', (req, res) => {
    const { ment_id } = req.params;
    const q = 'select * from leave_table where mentor_id = ${ment_id}';
    db.query(q, (err, data) => {
        if (err) return console.log(err);
        // console.log("l", data);
        res.status(200).send({
            success: true,
            list: data
        });
    });
});

app.get('/getappcount/:ment_id', (req, res) => {
    const { ment_id } = req.params;
    const appQ = `select count(*) from leave_table where status=1 and mentor_id = ${ment_id};`;
    db.query(appQ, (err, data) => {
        if (err) return console.log(err);
        const appr = data[0]['count(*)'];
        res.status(200).send({
            success: true,
            appr
        });
    });
});

app.get('/getpencount/:ment_id', (req, res) => {
    const { ment_id } = req.params;
    const penQ = `select count(*) from leave_table where status=0 and mentor_id = ${ment_id};`;
    db.query(penQ, (err, data) => {
        if (err) return console.log(err);
        const pend = data[0]['count(*)'];
        res.status(200).send({
            success: true,
            pend
        });
    });
});

app.get('/getrejcount/:ment_id', (req, res) => {
    const { ment_id } = req.params;
    const rejQ = `select count(*) from leave_table where status=2 and mentor_id = ${ment_id};`;
    db.query(rejQ, (err, data) => {
        if (err) return console.log(err);
        const rejc = data[0]['count(*)'];
        res.status(200).send({
            success: true,
            rejc
        });
    });
});

app.get("/leavedets/:leaveId", (req, res) => {
    const { leaveId } = req.params;
    const leaveDetsQuery = `Select * from leave_table where id = ${leaveId}`;

    db.query(leaveDetsQuery, (err, data) => {
        if (!err) {
            const leaveDets = data[0];
            // console.log('leavedets', data[0]);
            // console.log('leavedets', leaveDets);
            res.status(200).send({
                success: true,
                leaveDets
            });
        }
    });
});

app.get("/studdets/:studId", (req, res) => {
    const { studId } = req.params;
    const studDetsQuery = `Select * from student_master where id = ${studId}`;
    db.query(studDetsQuery, (err, data) => {
        if (!err) {
            const studDets = data[0];
            // console.log("studdets", data[0]);
            // console.log("studdets", studDets);
            res.status(200).send({
                success: true,
                studDets
            });
        }
    });
});

app.get("/pendingleaves/:ment_id", (req, res) => {
    const { ment_id } = req.params;
    const sql = `select * from leave_table where status = 0 and mentor_id = ${ment_id}`;
    db.query(sql, (err, data) => {
        if (!err) {
            res.status(200).send({
                success: true,
                leavesList: data
            });
        } else {
            res.status(500).send({
                success: false,
                message: "error in getting pending leaves",
                error: err
            });
        }
    })
});

app.get("/approvedleaves/:ment_id", (req, res) => {
    const { ment_id } = req.params;
    const sql = `select * from leave_table where status = 1 and mentor_id = ${ment_id}`;
    db.query(sql, (err, data) => {
        if (!err) {
            res.status(200).send({
                success: true,
                leavesList: data
            });
        } else {
            res.status(500).send({
                success: false,
                message: "error in getting approved leaves",
                error: err
            });
        }
    })
});

app.get("/rejectedleaves/:ment_id", (req, res) => {
    const { ment_id } = req.params;
    const sql = `select * from leave_table where status = 2 and mentor_id = ${ment_id}`;
    db.query(sql, (err, data) => {
        if (!err) {
            res.status(200).send({
                success: true,
                leavesList: data
            });
        } else {
            res.status(500).send({
                success: false,
                message: "error in getting rejected leaves",
                error: err
            });
        }
    })
});

app.patch("/changeleavestatus", (req, res) => {
    const { leaveId, status } = req.body;
    const sql = `update student_master set status = ${status} where id = ${leaveId};`;
    db.query(sql, (err, data) => {
        if (!err) {
            res.status(200).send({
                success: true,
                message: "Leave Status updated Successfully"
            });
        } else {
            res.status(500).send({
                success: false,
                message: "error in getting pending leaves",
                error: err
            });
        }
    });
});

app.listen(3000, () => {
    console.log("server on port 3000");
});
