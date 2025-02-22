const express = require('express');
const cors = require('cors');
const dataStore = require('./data/dataStore.json');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require("fs");
const pathToLocalDB = "./data/dataStore.json";

const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors({
    origin: 'http://localhost:5500',  // Адрес фронта
    credentials: true  // Разрешает отправку cookie
}));

const server = http.createServer(app);
const io = new Server(server);

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

//--------------socket.io--------------
io.on('connection', (socket) => {
    console.log('Käyttäjä yhdistetty:', socket.id);

    // Processing the entrance to the chat
  socket.on("join", (name) => {
    socket.username = name; // Save the username
    io.emit("join", name); // We notify all users
  });

  // Processing message sending
  socket.on("message", (data) => {
    io.emit("message", { sender: socket.username, text: data.text });
  });

  // Handling exit from chat
  socket.on("leave", (name) => {
    io.emit("leave", name);
  });

  socket.on("disconnect", () => {
    console.log("Käyttäjä katkaisi yhteyden");
  });
});
//--------------------------------------


function loadUsers() {
    const data = fs.readFileSync(pathToLocalDB, "utf8");
    //console.log("Загруженная база данных:", data);
    // console.log("Загруженные пользователи:", JSON.parse(data).team);

    return JSON.parse(data).team;
}

//---------endpoints----------
// Эндпоинт для логина
app.post('/api/login', (req, res) => {
    // console.log('Request body:', req.body);
    const { username, password } = req.body;
    const users = loadUsers(); // Загружаем пользователей из файла

    // Ищем пользователя
    const user = users.find(u => u.name === username && u.password === password);

    if (user) {
        req.session.user = { id: user.id, avatar: user.avatar, name: user.name, role: user.role, position: user.position, department: user.department, email: user.email, phone: user.phone, desiredVacationMonth: user.desiredVacationMonth, approvedVacationMonth: user.approvedVacationMonth }; // Сохраняем данные пользователя в сессии (кроме пароля)

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
    // console.log("данные профиля авторизованного пользователя: ", req.session.user);
    const { id, avatar, name, role, position, department, email, phone, desiredVacationMonth, approvedVacationMonth } = req.session.user;

    // Здесь можно подтягивать данные о пользователе из базы данных, если нужно
    const userData = {
        id,
        avatar,
        name,
        role,
        position,
        department,
        email,
        phone,
        desiredVacationMonth,
        approvedVacationMonth
    };

    res.json(userData);
});

//------------REST API palvelin-----------
//API для обработки запроса на утверждение отпуска
app.post("/api/request-vacation", (req, res) => {
    console.log("тело боди в API запроса на утверждение: ",req.body);
    const { userId, month } = req.body;
    const dataStore = require("./data/dataStore.json");
    console.log("проверка типа получаемого userId: ", typeof userId);
    console.log("проверка типа получаемого userId с плюсом: ", typeof +userId);
    console.log("id в профиле Virtanen: ",dataStore.team[1].id);
    const user = dataStore.team.find(u => u.id === +userId);
    console.log("данные пользователя в API запроса на утверждение: ",user);
    if (!user) {
        return res.json({ success: false, error: "Пользователь не найден" });
    }

    // Добавляем запрос в список ожидающих
    const newRequest = { userId, name: user.name, month, status: "pending" };
    console.log("newRequest в API на запрос: ",newRequest);
    dataStore.vacationRequests.push(newRequest);

    // Записываем изменения
    fs.writeFileSync("./data/dataStore.json", JSON.stringify(dataStore, null, 2));

    res.json({ success: true });
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
    res.json(dataStore);
});

// Эндпоинт для вывода данных сотрудников для пользователя guest
app.get('/api/staff-limited', (req, res) => {
    //console.log("Персонал для гостя:", dataStore.team);

    const limitedData = dataStore.team.map(emp => ({
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

// Эндпоинт для регистрации гостя (сохранение данных в dataStore.json)
const path = require("path");
//const dataFilePath = path.join(__dirname, "dataStore.json");

app.post("/api/register-guest", (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, error: "Заполните все поля" });
    }

    // Проверяем, есть ли пользователь в registeredUsers
    const userExists = dataStore.registeredUsers.some(user => user.email === email);

    if (userExists) {
        // Если пользователь уже зарегистрирован, отправляем таблицу персонала
        return res.json({ success: false, alreadyRegistered: true });
    }

    // Если пользователя нет в базе, регистрируем его
    const newUser = { name, email, phone };
    dataStore.registeredUsers.push(newUser);

    // Сохраняем изменения в файле
    const fs = require("fs");
    fs.writeFile("./data/dataStore.json", JSON.stringify(dataStore, null, 2), (err) => {
        if (err) {
            console.error("Ошибка записи в dataStore.json:", err);
            return res.status(500).json({ success: false, error: "Ошибка сохранения данных." });
        }

        res.json({ success: true });
    });

    // Проверка успешного добавления в dataStore.json
    // try {
    //     const fs = require("fs");
    //     const dataStore = JSON.parse(fs.readFileSync("./data/dataStore.json", "utf8"));

    //     dataStore.registeredUsers.push({
    //         name,
    //         email,
    //         phone
    //     });

    //     fs.writeFileSync("./data/dataStore.json", JSON.stringify(dataStore, null, 2));

    //     res.json({ success: true });
    // } catch (error) {
    //     console.error("Ошибка записи в файл:", error);
    //     res.status(500).json({ success: false, error: "Ошибка сервера" });
    // }
});

// Эндпоинт для обработки кнопок Admin
app.get("/api/get-vacation-requests", (req, res) => {
    const dataStore = require("./data/dataStore.json");
    res.json({ requests: dataStore.vacationRequests });
});

app.post("/api/approve-vacation", (req, res) => {
    const { userId } = req.body;
    let dataStore = require("./data/dataStore.json");

    let request = dataStore.vacationRequests.find(r => r.userId === userId);
    console.log("request в approve-vacation: ",request);
    let user = dataStore.team.find(u => u.id === +userId);
    console.log("user в approve-vacation: ",user);
    if (request && user) {
        request.status = "approved";

        // Форматируем дату как "19.02.2025 14:30"
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        request.approvedDate = formattedDate; // Записываем дату одобрения
        user.approvedVacationMonth = request.month; // Фиксируем утвержденный месяц отпуска

        fs.writeFileSync("./data/dataStore.json", JSON.stringify(dataStore, null, 2));
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "Запрос или сотрудник не найден" });
    }
});

app.post("/api/decline-vacation", (req, res) => {
    const { userId } = req.body;
    let dataStore = require("./data/dataStore.json");

    let request = dataStore.vacationRequests.find(r => r.userId === userId);
    if (request) {
        request.status = "declined";
        fs.writeFileSync("./data/dataStore.json", JSON.stringify(dataStore, null, 2));
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "Запрос не найден" });
    }
});
//--окончание эндпоинта для обработки кнопок Admin----

// Эндпоинт для выхода
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});


//----------palvelimen käynnistys----------
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Example app listening on port ${PORT}!`);    
});
//-----------------------------------------