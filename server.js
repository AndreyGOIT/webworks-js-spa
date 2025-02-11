const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.static('public/js'));
app.use(express.static('public/css'));
app.use(express.static('public/data'));
app.use(express.json());

let employees = [];

try {
    employees = require('./data/employees.json');
} catch (error) {
    console.error('Fetching error employees.json:', error);
}

app.get('/api/staff', (req, res) => {
    res.json(employees);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});