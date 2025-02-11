const express = require('express');
const cors = require('cors');
const employees = require('./data/employees.json');

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

// Статические данные для авторизации (простой пример)
const users = [
    { username: 'admin', password: '$2b$10$3Lk8fZf3F4Z5uP0mMml/.uJ0/ug1u6l4sNjG2jm5dBea.YGnKOgxa' } // пароль: admin123
];

// Эндпоинт для логина
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.user = username; // Сохраняем в сессии
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid password');
            }
        });
    } else {
        res.status(401).send('User not found');
    }
});

// Проверка авторизации
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(403).send('Not authenticated');
}

// Эндпоинт для вывода данных сотрудников (доступ только для авторизованных пользователей)
app.get('/api/staff', isAuthenticated, (req, res) => {
    res.send(employees);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});