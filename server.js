const express = require('express');
const cors = require('cors');
const employees = require('./data/employees.json');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Настроим сессии
app.use(session({
    secret: 'secret_key', // Секрет для подписи cookie
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Включим secure для HTTPS
}));

// Эндпоинт для логина
app.post('/api/login', (req, res) => {
    console.log('Request body:', req.body); // Логируем данные запроса
    const { username, password } = req.body;
    
    // Пример: База данных пользователей (в реальном приложении будет использоваться база данных)
    const users = [
        { username: 'admin', password: '1234' },
        { username: 'user', password: 'password' }
    ];
    
    // Ищем пользователя по имени
    const user = users.find(user => user.username === username);
    
    if (user && user.password === password) {
        console.log('Login successful');
        req.session.user = { username }; // Сохраняем пользователя в сессии
        console.log("Session after login:", req.session); // <== ВАЖНО!
        return res.json({ success: true });
    }
    res.status(401).json({ message: 'Invalid username or password' });
});

// Проверка авторизации
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(403).json({ error: 'Not authenticated' }); // Вернем JSON, а не строку
}

// Эндпоинт для проверки авторизации
app.get('/api/check-auth', (req, res) => {
    res.json({ authenticated: !!req.session.user });
});

// Эндпоинт для вывода данных сотрудников (с мидлвейром)
app.get('/api/staff', isAuthenticated, (req, res) => {
    console.log("Session data:", req.session);
    console.log("User data:", req.session.user);
    res.json(employees);
});

// Эндпоинт для выхода
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});