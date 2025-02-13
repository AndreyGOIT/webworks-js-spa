const express = require('express');
const cors = require('cors');
const employees = require('./data/employees.json');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5500',  // Адрес фронта
    credentials: true  // Разрешает отправку cookie
}));
app.use(express.static('public'));
app.use(express.json());

// Настроим сессии
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,   // Защита от XSS
        secure: false,    // false для локальной разработки, true для HTTPS
        sameSite: 'lax' // Меняем 'none' на 'lax'
    }
}));

// Эндпоинт для логина
app.post('/api/login', (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    // Имитация базы данных пользователей
    const users = [
        { username: 'admin', password: '1234' },
        { username: 'user', password: 'password' }
    ];

    // Ищем пользователя по username
    const user = users.find(user => user.username === username);

    if (user && user.password === password) {
        console.log('Login successful');
        req.session.user = { username }; // Сохраняем пользователя в сессии
        console.log("Session after login:", req.session);

        // Сохраняем сессию и только затем отправляем ответ
        return req.session.save(err => {
            if (err) {
                console.error('Ошибка сохранения сессии:', err);
                return res.status(500).json({ success: false, error: 'Ошибка сервера' });
            }
            console.log("Session successfully saved!");
            res.json({ success: true, user: req.session.user.username });
        });
    }

    // Если логин неудачный, сразу отправляем ответ (без return, так как выше уже был return)
    res.status(401).json({ success: false, error: 'Неверные учетные данные' });
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
    console.log('Session in chek-auth:', req.session);  // Лог сессии
    
    if (req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    }

    res.json({ isAuthenticated: false });
    // res.json({ isAuthenticated: !!req.session.user });
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