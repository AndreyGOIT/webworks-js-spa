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