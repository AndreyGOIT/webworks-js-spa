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
    henkilosto: `<div class="container my-5">
  <h2>Регистрация для доступа к персоналу</h2>
  
  <!-- Форма регистрации -->
  <form id="registration-form">
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

  <!-- Ссылка на страницу с персоналом после регистрации -->
  <div id="employee-list" class="d-none mt-4">
    <h3>Сотрудники</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody id="staff-table">
        <!-- Сюда будет выводиться список сотрудников -->
      </tbody>
    </table>
  </div>
</div>`
};

window.loadPage = function (page) {
    if (page === "henkilosto") {
        checkUserRole()
            .then(role => {
                console.log("Роль пользователя:", role);
                if (role === "admin") {
                    console.log("проверка сравнения: ", role === "admin");
                    document.getElementById("main_alue").innerHTML = `<h2>Админ-панель сотрудников</h2><table class="table">
                    <thead>
                        <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody id="staff-table">
                        <!-- Сюда будет выводиться список сотрудников -->
                    </tbody>
                    </table>`;
                    console.log("Вызываем loadStaff()");
                    loadStaff(); // Загружаем список сотрудников
                } else if (role === "user") {
                    document.getElementById("main_alue").innerHTML = "<h2>Ваши личные данные</h2>";
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
            console.log("data.role in fc checkUserRole: ", data.role);
            console.log("type of data.role in fc checkUserRole: ", typeof data.role);
            return data.role; // Возвращает роль пользователя
        }) // Ожидается, что сервер вернет { role: "admin" | "user" | "guest" }
        .catch(error => {
            console.error("Ошибка загрузки роли:", error);
            return "guest"; // Если произошла ошибка, считаем, что пользователь не авторизован
        });
}

function loadUserProfile() {
    fetch("/api/user-profile", { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            document.getElementById("main_alue").innerHTML = `
                <h2>Ваш профиль</h2>
                <p><strong>Имя:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Роль:</strong> ${data.role}</p>
            `;
        })
        .catch(error => {
            console.error("Ошибка загрузки профиля:", error);
            document.getElementById("main_alue").innerHTML = "<h2>Ошибка загрузки профиля</h2>";
        });
}
//---old version loadPage----
function loadPage(page) {
    document.getElementById("main_alue").innerHTML = pages[page] || "<h2>Sivua ei löytynyt</h2>";

    if (page === "henkilosto") {
        document.addEventListener("DOMContentLoaded", function () {
            console.log("DOM загружен, вызываем loadStaff()");
            loadStaff();
        });
        //loadStaff();
    }
}
//---------------------------

function loadStaff() {
    console.log("loadStaff() запущен");
    fetch("/api/staff", {
        method: 'GET',
        credentials: 'include'  // Это гарантирует, что сессионная кука будет отправляться с запросами
    })
        .then(response => response.json())
        .then(data => {
            console.log("data from fc loadStaff: ", data);
            const staffTable = document.getElementById("staff-table");
            console.log("staff-table:", staffTable);
    
            if (!staffTable) {
                console.error("Error: staff-table element not found!");
                return;
            }
    
            const staff = data.team;
            staffTable.innerHTML = staff.map(person => `
                <tr>
                    <td><img src="${person.avatar}" alt="Avatar" width="50"></td>
                    <td>${person.name}</td>
                    <td>${person.role}</td>
                    <td>${person.email}</td>
                    <td>${person.phone}</td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Error loading staff data:", error));
}