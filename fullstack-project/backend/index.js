const express = require('express');
const session = require('express-session');
const crypto = require('node:crypto');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('database.sqlite');

// Middleware за парсване на JSON
app.use(express.json());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // secure: true изисква HTTPS
}));

// Инициализация на базата данни
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        salt TEXT
    );
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        major TEXT
    );
`);

// Помощни функции за пароли
const generateSalt = () => crypto.randomBytes(16).toString('hex');
const hashPassword = (password, salt) => crypto.createHash('sha256').update(password + salt).digest('hex');

// Създаване на тестов админ, ако няма такъв
const adminCheck = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminCheck) {
    const salt = generateSalt();
    const hash = hashPassword('admin123', salt);
    db.prepare('INSERT INTO users (username, password, salt) VALUES (?, ?, ?)').run('admin', hash, salt);
}

// Auth Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.username) return next();
    res.status(401).json({ error: 'Unauthorized' });
};

// --- AUTH ENDPOINTS ---
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    try {
        const salt = generateSalt();
        const hash = hashPassword(password, salt);
        db.prepare('INSERT INTO users (username, password, salt) VALUES (?, ?, ?)').run(username, hash, salt);
        res.json({ message: 'Registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Username taken' });
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (user && user.password === hashPassword(password, user.salt)) {
        req.session.username = user.username;
        res.json({ message: 'Logged in', username: user.username });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

app.get('/api/is-logged', (req, res) => {
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});

// --- STUDENT ENDPOINTS ---
app.get('/api/students', (req, res) => {
    const students = db.prepare('SELECT * FROM students').all();
    res.json(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id);
    student ? res.json(student) : res.status(404).json({ error: 'Not found' });
});

app.post('/api/students', isAuthenticated, (req, res) => {
    const { name, age, major } = req.body;
    const info = db.prepare('INSERT INTO students (name, age, major) VALUES (?, ?, ?)').run(name, age, major);
    res.json({ id: info.lastInsertRowid, name, age, major });
});

app.delete('/api/students/:id', isAuthenticated, (req, res) => {
    const info = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
    info.changes > 0 ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
