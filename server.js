const express = require('express');
const cors = require('cors');
const dataStore = require('./data/dataStore.json');
const session = require('express-session');
const fs = require("fs");
const pathToLocalDB = "./data/dataStore.json";

const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors({
    origin: 'http://localhost:5500',  // Front address
    credentials: true  // Allows sending cookies
}));

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json());

// Setting up a session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,   // XSS protection
        secure: false,    // false for local development, true for HTTPS
        sameSite: 'lax' // Change 'none' to 'lax'
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
    const data = fs.readFileSync(pathToLocalDB, "utf8"); // Read the database file

    return JSON.parse(data).team;
}

//---------ENDPOINTS----------
// Endpoint for login
app.post('/api/login', (req, res) => {
    // console.log('Request body:', req.body);
    const { username, password } = req.body;
    const users = loadUsers(); // Loading users from a database

    // Looking for user
    const user = users.find(u => u.name === username && u.password === password);

    if (user) {
        req.session.user = { id: user.id, avatar: user.avatar, name: user.name, role: user.role, position: user.position, department: user.department, email: user.email, phone: user.phone, desiredVacationMonth: user.desiredVacationMonth, approvedVacationMonth: user.approvedVacationMonth }; // We save user data in the session (except the password)

        return req.session.save(err => {
            if (err) {
                console.error('Error saving session:', err);
                return res.status(500).json({ success: false, error: 'Server error' });
            }
            res.json({ success: true, user: req.session.user });
        });
    }

    res.status(401).json({ success: false, error: 'Incorrect credentials' });
});

// Checking user role
app.get("/api/user-role", (req, res) => {
    if (!req.session.user) {
        return res.json({ role: "guest" });
    }
    res.json({ role: req.session.user.role }); // For example, "admin" or "user"
});

// Endpoint for outputting employee data
app.get('/api/user-profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    // console.log("authorized user profile data: ", req.session.user);
    const { id, avatar, name, role, position, department, email, phone, desiredVacationMonth, approvedVacationMonth } = req.session.user;

    // user data from the database
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
//API for processing leave approval request
app.post("/api/request-vacation", (req, res) => {
    const { userId, month } = req.body;
    const dataStore = require("./data/dataStore.json");
    
    const user = dataStore.team.find(u => u.id === +userId); // Finding a user by ID
    
    if (!user) {
        return res.json({ success: false, error: "User not found" });
    }

    // Adding a request to the pending list
    const newRequest = { userId, name: user.name, month, status: "pending" };
    dataStore.vacationRequests.push(newRequest);

    // write down the changes to the file
    fs.writeFileSync("./data/dataStore.json", JSON.stringify(dataStore, null, 2));

    res.json({ success: true });
});

// Middleware for Route Protection
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.status(403).json({ error: "Not authenticated" });
    }
    
    // Role check only for /api/staff
    if (req.path === "/api/staff" && req.session.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
    }

    next(); // continue executing the next handler
}

// Endpoint for checking authorization
app.get('/api/check-auth', (req, res) => {
    
    if (req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    }

    res.json({ isAuthenticated: false });
});

// Endpoint for outputting employee data (with middleware)
app.get('/api/staff', isAuthenticated, (req, res) => {
    res.json(dataStore);
});

// Endpoint for displaying employee data for the GUEST user
app.get('/api/staff-limited', (req, res) => {

    const limitedData = dataStore.team.map(emp => ({
        id: emp.id,
        avatar: emp.avatar,
        name: emp.name,
        position: emp.position,
        email: emp.email,
        phone: emp.phone
        // DO NOT add a month of vacation (or other internal data)
    }));
    res.json(limitedData);
});

// Endpoint for guest registration (saving data to dataStore.json)

app.post("/api/register-guest", (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, error: "Fill in all fields" });
    }

    // Check if the user is in registeredUsers
    const userExists = dataStore.registeredUsers.some(user => user.email === email);

    if (userExists) {
        // If the user is already registered, we send the staff table
        return res.json({ success: false, alreadyRegistered: true });
    }

    // If the user is not in the database, we register him
    const newUser = { name, email, phone };
    dataStore.registeredUsers.push(newUser);

    // Save changes to the file
    const fs = require("fs");
    fs.writeFile("./data/dataStore.json", JSON.stringify(dataStore, null, 2), (err) => {
        if (err) {
            console.error("Error writing to dataStore.json:", err);
            return res.status(500).json({ success: false, error: "Error saving data." });
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

//----------Endpoint for handling Admin buttons-------
app.get("/api/get-vacation-requests", (req, res) => {
    const dataStore = require("./data/dataStore.json");
    res.json({ requests: dataStore.vacationRequests });
});

app.post("/api/approve-vacation", (req, res) => {
    const { userId } = req.body;
    let dataStore = require("./data/dataStore.json");

    let request = dataStore.vacationRequests.find(r => r.userId === userId);
    console.log("request in approve-vacation: ",request);
    let user = dataStore.team.find(u => u.id === +userId);
    console.log("user in approve-vacation: ",user);
    if (request && user) {
        request.status = "approved";

        // Format the date as "19.02.2025 14:30"
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        request.approvedDate = formattedDate; // write down the date of approval
        user.approvedVacationMonth = request.month; // fix the approved month of vacation

        fs.writeFileSync("./data/dataStore.json", JSON.stringify(dataStore, null, 2));
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "Request or employee not found" });
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
        res.json({ success: false, error: "Request not found" });
    }
});
//--endpoints for processing buttons at Admin end here----

// Endpoint for exiting the session
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