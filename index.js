const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bankdb',
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection error: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

app.post('/submit-form', (req, res) => {
    console.log(req.body);
    const formData = req.body;

    const sql = 'INSERT INTO bankstatements SET ?';
    connection.query(sql, formData, (error, results) => {
        if (error) {
            console.error('Database insertion error: ' + error.message);
            res.status(500).json({ message: 'Database insertion error' });
        }
        else {
            console.log('Data  inserted into the database');
            res.status(200).json({ message: 'Form data submitted successfully' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
