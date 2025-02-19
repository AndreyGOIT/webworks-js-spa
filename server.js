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

const fs = require("fs");
const pathToLocalDB = "./data/employees.json";

function loadUsers() {
    const data = fs.readFileSync(pathToLocalDB, "utf8");
    //console.log("Загруженная база данных:", data);
    console.log("Загруженные пользователи:", JSON.parse(data).team);

    return JSON.parse(data).team;
}

// Эндпоинт для логина
app.post('/api/login', (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;
    const users = loadUsers(); // Загружаем пользователей из файла

    // Ищем пользователя
    const user = users.find(u => u.name === username && u.password === password);

    if (user) {
        req.session.user = { id: user.id, avatar: user.avatar, name: user.name, role: user.role, position: user.position, department: user.department, email: user.email, phone: user.phone, desiredVacationMonth: user.desiredVacationMonth }; // Сохраняем данные пользователя в сессии (кроме пароля)

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

// Эндпоинт для вывода данных сотрудников
app.get('/api/user-profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Неавторизованный доступ" });
    }
    console.log("данные профиля авторизованного пользователя: ", req.session.user);
    const { avatar, name, role, position, department, email, phone, desiredVacationMonth } = req.session.user;

    // Здесь можно подтягивать данные о пользователе из базы данных, если нужно
    const userData = {
        avatar,
        name,
        role,
        position,
        department,
        email,
        phone,
        desiredVacationMonth
    };

    res.json(userData);
});

// Middleware для защиты маршрутов
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.status(403).json({ error: "Not authenticated" });
    }
    
    // Проверка роли только для /api/staff
    if (req.path === "/api/staff" && req.session.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
    }

    next();
}

// Эндпоинт для проверки авторизации
app.get('/api/check-auth', (req, res) => {
    //console.log('Session in chek-auth:', req.session);  // Лог сессии
    
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

// Эндпоинт для вывода данных сотрудников для пользователя guest
app.get('/api/staff-limited', (req, res) => {
    //console.log("Персонал для гостя:", employees.team);

    const limitedData = employees.team.map(emp => ({
        id: emp.id,
        avatar: emp.avatar,
        name: emp.name,
        position: emp.position,
        email: emp.email,
        phone: emp.phone
        // НЕ добавляем месяц отпуска
    }));
    res.json(limitedData);
});

// Эндпоинт для регистрации гостя (сохранение данных в employees.json)
//const fs = require("fs");
const path = require("path");

app.post("/api/register-guest", (req, res) => {
    //console.log("Request body in endpoint register-guest:", req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, error: "Заполните все поля" });
    }

    // Проверка успешного добавления в employees.json
    try {
        const fs = require("fs");
        const employees = JSON.parse(fs.readFileSync("./data/employees.json", "utf8"));

        employees.registeredUsers.push({
            name,
            email,
            phone
        });

        fs.writeFileSync("./data/employees.json", JSON.stringify(employees, null, 2));

        res.json({ success: true });
    } catch (error) {
        console.error("Ошибка записи в файл:", error);
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
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