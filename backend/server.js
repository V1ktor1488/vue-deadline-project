// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- Example data ---
let students = [
    { id: 1, name: "Ivan" },
    { id: 2, name: "Maria" }
];

let teachers = [
    { id: 1, name: "Petar" },
    { id: 2, name: "Elena" }
];

// --- Routes ---

// Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Get all teachers
app.get('/teachers', (req, res) => {
    res.json(teachers);
});

// Example login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('API running');
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
