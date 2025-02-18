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

// Имитация базы данных пользователей с ролями
const users = [
    { username: 'admin', password: '1234', role: 'admin' },
    { username: 'user', password: 'password', role: 'user' }
];

// Эндпоинт для логина
app.post('/api/login', (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    // Ищем пользователя
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = { username: user.username, role: user.role }; // Сохраняем и роль

        return req.session.save(err => {
            if (err) {
                console.error('Ошибка сохранения сессии:', err);
                return res.status(500).json({ success: false, error: 'Ошибка сервера' });
            }
            res.json({ success: true, user: req.session.user });
        });
    }

    res.status(401).json({ success: false, error: 'Неверные учетные данные' });
});

// Проверка роли пользователя
app.get("/api/user-role", (req, res) => {
    if (!req.session.user) {
        return res.json({ role: "guest" });
    }
    res.json({ role: req.session.user.role }); // Например, "admin" или "user"
});

// Middleware для защиты маршрутов
function isAuthenticated(req, res, next) {
    console.log("Session in isAuthenticated:", req.session);  // Логируем сессию
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