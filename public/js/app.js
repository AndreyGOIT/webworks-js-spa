const pages = {
    home: "<h2>Etusivu</h2><p>Tervetuloa WebWorks Studioon!</p>",
    tuotteet: "<h2>Tuotteet</h2><p>Tässä on tuotteemme.</p>",
    yhteystiedot: "<h2>Yhteystiedot</h2><p>Ota yhteyttä meihin!</p>",
    henkilokunta: "<h2>Henkilökunta</h2><div id='staff-table'></div>"
};

function loadPage(page) {
    document.getElementById("main_alue").innerHTML = pages[page] || "<h2>Sivua ei löytynyt</h2>";

    if (page === "henkilokunta") {
        loadStaff();
    }
}

function loadStaff() {
    fetch("/api/staff", {
        method: 'GET',
        credentials: 'include'  // Это гарантирует, что сессионная кука будет отправляться с запросами
    })
        .then(response => response.json())
        .then(data => {
            const staff = data.team; // Доступ к массиву team
            const table = `<table border="1">
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                ${staff.map(person => `
                    <tr>
                        <td><img src="${person.avatar}" alt="Avatar" width="50"></td>
                        <td>${person.name}</td>
                        <td>${person.role}</td>
                        <td>${person.email}</td>
                        <td>${person.phone}</td>
                    </tr>
                `).join("")}
            </table>`;
            document.getElementById("staff-table").innerHTML = table;
        })
        .catch(error => console.error("Error loading staff data:", error));
}