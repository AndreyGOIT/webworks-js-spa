document.addEventListener("DOMContentLoaded", function () {
    loadPage('home');
});

const pages = {
    home: `<div class='hero-img'>
    <h1>WebWorks Studio</h1>
    </div>
    <div class='content-block'>
        <img src='/images/slogan_kuva.png' alt='Company slogan image' class='slogan-img'>
        <div class='content-text'>
            <h2>ABOUT WebWorks Studio</h2>
            <p>WebWorks Studio on nykyaikainen ohjelmistokehityksen yritys, joka keskittyy täyden palvelun verkkosivustojen ja sovellusten suunnitteluun ja toteutukseen. Tarjoamme räätälöityjä ratkaisuja, jotka vastaavat asiakkaidemme tarpeita ja auttavat heidän liiketoimintaansa kasvamaan digitaalisessa ympäristössä.
            <br/>
            Olemme ylpeitä siitä, että yhdistämme luovuuden, teknisen asiantuntemuksen ja nykyaikaiset teknologiat tuottaaksemme korkealaatuisia ja käyttäjäystävällisiä verkkopalveluita. Olipa kyseessä yrityksen kotisivu, verkkokauppa tai räätälöity sovellus, tiimimme huolehtii koko kehitysprosessista alusta loppuun.
            <br/>
            Laita ideasi käytäntöön WebWorks Studion kanssa!</p>
        </div>
    </div>
    <div><h2>“Teemme digitaalisen helpoksi”</h2></div>`,
    tuotteet: "<h2>Tuotteet</h2><p>Tässä on tuotteemme.</p>",
    yhteystiedot: "<h2>Yhteystiedot</h2><p>Ota yhteyttä meihin!</p>",
    henkilosto: `<div id="guestFormContainer" class="container my-5">
  <h2>Регистрация для доступа к персоналу</h2>
  
  <!-- Форма регистрации -->
  <form id="guestRegisterForm">
    <div class="mb-3">
      <label for="name" class="form-label">Имя</label>
      <input type="text" class="form-control" id="name" required>
      <div id="nameError" class="invalid-feedback">Пожалуйста, введите ваше имя (только буквы).</div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" required>
      <div id="emailError" class="invalid-feedback">Пожалуйста, введите корректный email.</div>
    </div>

    <div class="mb-3">
      <label for="phone" class="form-label">Телефон</label>
      <input type="text" class="form-control" id="phone" required>
      <div id="phoneError" class="invalid-feedback">Пожалуйста, введите корректный номер телефона.</div>
    </div>

    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
  </form>
</div>
<!-- Таблица с персоналом для зарегистрированных пользователей -->
<div id="staffTableContainer" style="display: none;">
    <h2>Персонал</h2>
    <table id="staffTable" class="table table-striped">
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>`
};

window.loadPage = function (page) {
    if (page === "henkilosto") {
        checkUserRole()
            .then(role => {
                console.log("Роль пользователя в Henkilöstö:", role);
                if (role === "admin") {
                    console.log("проверка сравнения: ", role === "admin");
                    console.log("Admin вызывает loadStaff()");
                    document.getElementById("main_alue").innerHTML = ""; // Очищаем содержимое main_alue
                    document.getElementById("main_alue").innerHTML = "Таблица сотрудников";
                    loadStaff(); // Загружаем список сотрудников
                } else if (role === "user") {
                    console.log("Вызываем loadUserProfile() в Henkilöstö");
                    loadUserProfile(); // Загружаем личные данные
                } else if (role === "guest") {
                    document.getElementById("main_alue").innerHTML = pages["henkilosto"]; // Показываем форму регистрации
                } else {
                    document.getElementById("main_alue").innerHTML = "<h2>Доступ запрещен. Пожалуйста, войдите.</h2>";
                }
            })
            .catch(error => {
                console.error("Ошибка при проверке роли:", error);
                document.getElementById("main_alue").innerHTML = "<h2>Ошибка загрузки данных</h2>";
            });
    } else {
        document.getElementById("main_alue").innerHTML = pages[page] || "<h2>Sivua ei löytynyt</h2>";
    }
}

function checkUserRole() {
    return fetch("/api/user-role", { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            //console.log("data.role in fc checkUserRole: ", data.role);
            //console.log("type of data.role in fc checkUserRole: ", typeof data.role);
            return data.role; // Возвращает роль пользователя
        }) // Ожидается, что сервер вернет { role: "admin" | "user" | "guest" }
        .catch(error => {
            console.error("Ошибка загрузки роли:", error);
            return "guest"; // Если произошла ошибка, считаем, что пользователь не авторизован
        });
}

function loadUserProfile() {
    console.log("Запрашиваем данные профиля пользователя...");
    fetch("/api/user-profile", { credentials: "include" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки профиля");
            }
            return response.json();
        })
        .then(user => {
            console.log("Данные профиля пользователя:", user);
            renderUserProfile(user);
        })
        .catch(error => {
            console.error("Ошибка загрузки профиля:", error);
            document.getElementById("main_alue").innerHTML = "<h2>Ошибка загрузки профиля</h2>";
        });
}

function loadStaff() {
    console.log("loadStaff() запущен");
    fetch("/api/staff", {
        method: 'GET',
        credentials: 'include'  // Это гарантирует, что сессионная кука будет отправляться с запросами
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки сотрудников: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("data from fc loadStaff - Загруженные сотрудники: ", data);
            
            renderStaffTable(data.team); // Отображаем сотрудников
        })
        .catch(error => {
            console.error("Error loading staff data:", error)
            document.getElementById("main_alue").innerHTML = "<h2>Ошибка загрузки данных</h2>";
        });
}

// Функция для отображения данных профиля пользователя
function renderUserProfile(user) {
    let mainAlue = document.getElementById("main_alue");
    mainAlue.innerHTML = `
        <h2>Käyttäjäprofiili</h2>
        <p><strong>Avatar:</strong><img src="${user.avatar}" width="150px"/></p>
        <p><strong>Nimi:</strong> ${user.name}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><strong>Position:</strong> ${user.position}</p>
        <p><strong>Department:</strong> ${user.department}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Телефон:</strong> ${user.phone}</p>
        <p><strong>DesiredVacationMonth:</strong> ${user.desiredVacationMonth}</p>
    `;
}

// Функция для отрисовки таблицы сотрудников
function renderStaffTable(staff) {
    if (!Array.isArray(staff) || staff.length === 0) {
        document.getElementById("main_alue").innerHTML += "<p>Нет данных для отображения</p>";
        return;
    }
    
    let tableHTML = `
        </br>
        <table border="1" class="table table-striped">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Desired Vacation Month</th>
                </tr>
            </thead>
            <tbody>
    `;

    staff.forEach(person => {
        tableHTML += `
            <tr>
                <td><img src="${person.avatar}" alt="${person.name}" width="50"></td>
                <td>${person.name}</td>
                <td>${person.role}</td>
                <td>${person.email}</td>
                <td>${person.phone}</td>
                <td>${person.desiredVacationMonth || "Не указано"}</td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;

    document.getElementById("main_alue").innerHTML += tableHTML;
}

// Функция loadStaffLimited() для загрузки таблицы без колонки “месяц отпуска”
function loadStaffLimited() {
    fetch("/api/staff-limited")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#staffTable tbody");
            tableBody.innerHTML = "";

            data.forEach(emp => {
                const row = document.createElement("tr");
                row.innerHTML = `<td><img src="${emp.avatar}" alt="${emp.name}" width="50"></td>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>`;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Ошибка загрузки сотрудников:", error));
}