document.addEventListener("DOMContentLoaded", function () {
    loadPage('home');
});

const pages = {
    home: `<div class='hero-img'>
    <h1 class="hero-title">WebWorks Studio</h1>
    </div>
    <div class='content-block'>
        <img src='/images/slogan_kuva.png' alt='Company slogan image' class='slogan-img'>
        <div class='content-text'>
            <h2>ABOUT WebWorks Studio</h2>
            <p class="content-text-about">WebWorks Studio on nykyaikainen ohjelmistokehityksen yritys, joka keskittyy täyden palvelun verkkosivustojen ja sovellusten suunnitteluun ja toteutukseen. Tarjoamme räätälöityjä ratkaisuja, jotka vastaavat asiakkaidemme tarpeita ja auttavat heidän liiketoimintaansa kasvamaan digitaalisessa ympäristössä.
            <br/>
            Olemme ylpeitä siitä, että yhdistämme luovuuden, teknisen asiantuntemuksen ja nykyaikaiset teknologiat tuottaaksemme korkealaatuisia ja käyttäjäystävällisiä verkkopalveluita. Olipa kyseessä yrityksen kotisivu, verkkokauppa tai räätälöity sovellus, tiimimme huolehtii koko kehitysprosessista alusta loppuun.
            <br/>
            Laita ideasi käytäntöön WebWorks Studion kanssa!</p>
        </div>
    </div>
    <div class="slogan"><h2 class="slogan-text">“Teemme digitaalisen helpoksi”</h2></div>`,
    tuotteet: `<section class="bg-light py-5 palvelut-main">
                <div class="container">
                    <h1 class="text-center">Tuotteet ja Palvelut</h1>
                    <p class="text-center">Alta löydät WebWorks Studion tarjoamat palvelut ja tuotteet.</p>
                    <div class="table-responsive shadow-sm rounded">
                    <table class="table table-bordered table-striped table-hover">
                        <thead class="table-light">
                        <tr>
                            <th>Palvelu / Tuote</th>
                            <th>Kuvaus</th>
                            <th>Toimitusaika</th>
                            <th>Hinta</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><button onclick="loadPage('verkkosivustonKehitys')" class="link-button">Verkkosivuston kehitys</button></td>
                            <td>Responsiivisten ja räätälöityjen verkkosivustojen suunnittelu ja toteutus</td>
                            <td>Alkaen 2 viikkoa</td>
                            <td>1500 €</td>
                        </tr>
                        <tr>
                            <td>Ylläpito ja tuki</td>
                            <td>Sisällön päivitys, virheiden korjaus ja sivuston seuranta</td>
                            <td>Kuukausittain</td>
                            <td>300 € / kuukausi</td>
                        </tr>
                        <tr>
                            <td><button onclick="loadPage('sovelluskehitys')" class="link-button">Verkkosovellusten kehitys</button></td>
                            <td>Monimutkaisten verkkosovellusten kehitys nykyaikaisilla teknologioilla</td>
                            <td>Alkaen 1 kuukausi</td>
                            <td>2500 €</td>
                        </tr>
                        <tr>
                            <td><button onclick="loadPage('hakukoneoptimointi')" class="link-button">SEO-optimointi</button></td>
                            <td>Sivuston näkyvyyden parantaminen hakukoneissa</td>
                            <td>2–4 viikkoa</td>
                            <td>800 €</td>
                        </tr>
                        <tr>
                            <td>Hosting ja domain</td>
                            <td>Verkkotunnusten rekisteröinti ja hosting-palvelut</td>
                            <td>1–2 päivää</td>
                            <td>50 € / kuukausi</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div class="container mt-5">
                    <h2 class="text-center">Käytämme moderneja teknologioita kehitystyössämme</h2>
                    <p class="text-center">WebWorks Studio käyttää nykyaikaisia teknologioita ja työkaluja kehitystyössämme.</p>
                    <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/bMknfKXIFA8" title="React-aloitusopas" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <p>
                        WebWorks Studio on sitoutunut käyttämään viimeisimpiä ja tehokkaimpia kehitystyökaluja tarjotakseen parhaan mahdollisen kokemuksen asiakkaillemme.
                        Yksi merkittävistä teknologioista, joita käytämme verkkosivustojen ja sovellusten kehityksessä, on
                        <a href="https://react.dev/" target="_blank">React</a>.
                        </p>
                        <p>
                        React on suosittu JavaScript-kirjasto, joka mahdollistaa responsiivisten ja interaktiivisten käyttöliittymien luomisen nopeasti ja tehokkaasti.
                        Reactin avulla voimme rakentaa monipuolisia ja helposti laajennettavia ratkaisuja, jotka vastaavat asiakkaidemme tarpeisiin ja toimivat saumattomasti eri laitteilla.
                        </p>
                        <p>
                        Valitsemalla WebWorks Studion voit olla varma, että projektisi toteutetaan laadukkaasti ja modernien kehitysstandardien mukaisesti.
                        </p>
                    </div>
                    </div>
                </div>
                </section>`,
    yhteystiedot: `<section class="bg-light py-5">
                    <!-- Yhteystiedot Container -->
                    <div class="container py-4">
                        <h1 class="text-center">Yhteystiedot</h1>
                        <!-- Контейнер для контактной информации и карты -->
                        <div class="row py-3">
                        <!-- Koodilohko yhteystiedoilla -->
                        <div class="col-md-6 text-center">
                            <address>
                            <p><strong>WebWorks Studio Oy</strong></p>
                            <p>
                                Osoite:
                                <a href="https://www.google.com/maps/search/?api=1&query=Hevosenkengänkatu+2,+06100+Porvoo" target="_blank">
                                Hevosenkengänkatu 2, 06100, Porvoo
                                </a>
                            </p>
                            <p>
                                Email:
                                <a href="mailto:info@webworksstudio.com">info@webworksstudio.com</a>
                            </p>
                            <p>Puhelin: <a href="tel:+358XXXXXXXXX">+358 (XX) XXX-XXXX</a></p>
                            <p>
                                Web-sivusto:
                                <a href="#" onclick="return false;">https://www.webworksstudio.fi</a>
                            </p>
                            </address>
                        </div>
                        <!-- Koodilohko kartalla -->
                        <div class="col-md-6 text-center">
                            <h4>Sijainti: Hevosenkengänkatu 2, 06100 Porvoo</h4>
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1993.313202080589!2d25.66350721622751!3d60.39333998197305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469206b59ae2c1a3%3A0xa31b92f47b8fdadb!2sHevosenkeng%C3%A4nkatu%202%2C%2006100%20Porvoo%2C%20Finland!5e0!3m2!1sen!2sfi!4v1698146940844!5m2!1sen!2sfi"
                            width="100%"
                            height="300"
                            style="border: 0"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        </div>
                    </div>
                    </section>`,
    henkilosto: `<div id="guestFormContainer" class="container my-5">
                    <h2>Rekisteröidy päästäksesi henkilökunnalle</h2>
                    
                    <!-- Ilmoittautumislomake -->
                    <form id="guestRegisterForm">
                        <div class="mb-3">
                        <label for="name" class="form-label">Nimi</label>
                        <input type="text" class="form-control" id="name" required>
                        <div id="nameError" class="invalid-feedback">Anna nimesi (vain kirjaimet).</div>
                        </div>

                        <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" required>
                        <div id="emailError" class="invalid-feedback">Anna kelvollinen sähköpostiosoite.</div>
                        </div>

                        <div class="mb-3">
                        <label for="phone" class="form-label">Puhelin</label>
                        <input type="text" class="form-control" id="phone" required>
                        <div id="phoneError" class="invalid-feedback">Anna kelvollinen puhelinnumero.</div>
                        </div>

                        <button type="submit" class="btn btn-primary">Rekisteröidy</button>
                    </form>
                    </div>
                    <!-- Henkilökuntapöytä rekisteröityneille käyttäjille -->
                    <div id="staffTableContainer" style="display: none;">
                        <h2>WebWorks Studion henkilökunta</h2>
                        </br>
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
                    </div>`,
    verkkosivustonKehitys: `<section class="bg-light py-5">
                            <div class="container">
                                <h1 class="text-center">Verkkosivuston kehitys</h1>
                                <p class="text-center">
                                WebWorks Studio tarjoaa räätälöityjä ja responsiivisia verkkosivustoja,
                                jotka on suunniteltu vastaamaan asiakkaidemme tarpeisiin. Teemme
                                verkkosivustojen kehittämisestä helppoa ja tehokasta.
                                </p>
                                <div class="row align-items-center">
                                <div class="col-lg-6 col-md-6 mb-4">
                                    <img
                                    src="images/istockphoto-verkkosivuston-kehitys-1024x1024.jpg"
                                    alt="Verkkosivuston kehitys"
                                    class="img-fluid rounded"
                                    />
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <h2>Palvelun ominaisuudet</h2>
                                    <ul>
                                    <li>Moderni ja käyttäjäystävällinen muotoilu</li>
                                    <li>Responsiivinen ulkoasu mobiili- ja työpöytälaitteille</li>
                                    <li>Hakukoneoptimoitu sisältö</li>
                                    <li>Integraatiot sosiaalisen median ja analytiikkatyökalujen kanssa</li>
                                    </ul>
                                    <h2>Toimitusaika ja hinta</h2>
                                    <p><strong>Toimitusaika:</strong> alkaen 2 viikkoa</p>
                                    <p><strong>Hinta:</strong> 1500 €</p>
                                    <button onclick="loadPage('tuotteet')" class="link-button">Takaisin tuotteisiin ja palveluihin</button>
                                </div>
                                </div>
                            </div>
                            </section>
                            `,
    sovelluskehitys: `<section class="py-5 bg-light">
                        <div class="container py-4">
                            <h1 class="text-center">Sovelluskehitys</h1>
                            <p class="text-center lead">
                            WebWorks Studio kehittää monipuolisia ja tehokkaita mobiili- ja verkkosovelluksia, jotka auttavat yrityksiä digitalisoitumaan ja parantamaan asiakaskokemusta.
                            </p>
                            <div class="row align-items-center py-4">
                            <div class="col-lg-6 mb-4">
                                <img src="images/istockphoto-sovelluskehitys-1024x1024.jpg" alt="Sovelluskehitys" class="img-fluid rounded shadow">
                            </div>
                            <div class="col-lg-6">
                                <h2 class="h4">Palvelun ominaisuudet</h2>
                                <ul class="list-group list-group-flush mb-3">
                                <li class="list-group-item">Räätälöidyt sovellukset yrityksen tarpeisiin</li>
                                <li class="list-group-item">Yhteensopivuus eri alustojen kanssa (iOS, Android, web)</li>
                                <li class="list-group-item">Käyttäjäystävällinen ja intuitiivinen käyttöliittymä</li>
                                <li class="list-group-item">Turvallinen ja skaalautuva ratkaisu</li>
                                </ul>
                                <h2 class="h4">Toimitusaika ja hinta</h2>
                                <p><strong>Toimitusaika:</strong> alkaen 3 viikkoa</p>
                                <p><strong>Hinta:</strong> 2500 €</p>
                                <button onclick="loadPage('tuotteet')" class="link-button">Takaisin tuotteisiin ja palveluihin</button>
                            </div>
                            </div>
                        </div>
                        </section>`,
    hakukoneoptimointi: `<section class="container py-5 bg-light text-dark">
                        <!-- SEO Service Container -->
                        <div class="container text-center">
                            <h1 class="mb-4">Hakukoneoptimointi (SEO)</h1>
                            <p class="lead">
                            Hakukoneoptimointi auttaa yritystäsi erottumaan hakukoneiden tuloksissa. WebWorks Studio tarjoaa SEO-palveluita, jotka parantavat
                            sivustosi näkyvyyttä ja liikennettä.
                            </p>
                        </div>

                        <div class="row align-items-center py-4">
                            <!-- Image Section -->
                            <div class="col-lg-6 mb-4 mb-lg-0">
                            <img src="images/istockphoto-SEO-1024x1024.jpg" alt="Hakukoneoptimointi (SEO)" class="img-fluid rounded shadow-sm" />
                            </div>
                            <!-- Service Details Section -->
                            <div class="col-lg-6">
                            <h2 class="h4">Palvelun ominaisuudet</h2>
                            <ul class="list-group list-group-flush mb-4">
                                <li class="list-group-item">Avainsanatutkimus ja kilpailija-analyysi</li>
                                <li class="list-group-item">Sisällön optimointi ja metatietojen parantaminen</li>
                                <li class="list-group-item">Sivuston tekninen optimointi</li>
                                <li class="list-group-item">Kuukausittainen raportointi ja jatkuva seuranta</li>
                            </ul>
                            <h2 class="h4">Toimitusaika ja hinta</h2>
                            <p><strong>Toimitusaika:</strong> jatkuva palvelu</p>
                            <p><strong>Hinta:</strong> 500 €</p>
                            <button onclick="loadPage('tuotteet')" class="link-button">Takaisin tuotteisiin ja palveluihin</button>
                            </div>
                        </div>
                        </section>`,
};

window.loadPage = async function (page) {
    if (page === "henkilosto") {
        try {
                const role = await checkUserRole() // Odotetaan roolin vahvistuksen valmistumista
            
                if (role === "admin") {
                    let mainAlue = document.getElementById("main_alue");
                    mainAlue.innerHTML = "<h3>Täysi henkilökuntataulukko järjestelmänvalvojalle</h3>";

                    await loadStaff(); // Ladataan työntekijälistaa

                    // Luo div adminPanelille, jos sitä ei vielä ole
                    let adminPanel = document.createElement("div");
                    adminPanel.id = "adminPanel";
                    mainAlue.appendChild(adminPanel); // Lisää arvoon main_value

                    renderAdminPanel(); // Näytetään hallintapaneeli

                } else if (role === "user") {

                    loadUserProfile(); // Henkilötietojen lataaminen

                } else if (role === "guest") {

                    document.getElementById("main_alue").innerHTML = pages["henkilosto"]; // Näytämme ilmoittautumislomakkeen

                } else {
                    document.getElementById("main_alue").innerHTML = "<h2>Käyttö estetty. Tule sisään.</h2>";
                }
            } catch(error) {
                console.error("Error loading page: ", error);
                document.getElementById("main_alue").innerHTML = "<h2>Virhe ladattaessa tietoja</h2>";
            };
    } else {
        document.getElementById("main_alue").innerHTML = pages[page] || "<h2>Sivua ei löytynyt</h2>";
    }
}

function checkUserRole() {
    return fetch("/api/user-role", { credentials: "include" })
        .then(response => response.json())
        .then(data => {
 
            return data.role; // Palauttaa käyttäjän roolin
        }) // Palvelimen odotetaan palauttavan { role: "admin" | "user" | "guest" }
        .catch(error => {
            console.error("Error loading role:", error);
            return "guest"; // Jos tapahtuu virhe, oletamme, että käyttäjää ei ole valtuutettu.
        });
}

function loadUserProfile() {
    fetch("/api/user-profile", { credentials: "include" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading profile");
            }
            return response.json();
        })
        .then(user => {
            renderUserProfile(user); // Näytetään profiilitiedot
        })
        .catch(error => {
            console.error("Error loading profile:", error);
            document.getElementById("main_alue").innerHTML = "<h2>Error loading profile</h2>";
        });
}

async function loadStaff() {
    try {
        let response = await fetch("/api/staff", {
            method: 'GET',
            credentials: 'include'  // Tämä varmistaa, että istuntoeväste lähetetään pyyntöjen kanssa.
        });
        let data = await response.json();

        renderStaffTable(data.team); // Työntekijöiden esittely
    } catch (error) {
        console.error("Error loading staff data:", error)
        document.getElementById("main_alue").innerHTML = "<h2>Error loading staff data</h2>";
    }
}

// Function for displaying user profile data
function renderUserProfile(user) {
    let mainAlue = document.getElementById("main_alue");
    mainAlue.innerHTML = `
        <h3 class="text-center">Käyttäjäprofiili</h3>
        <div class="d-flex justify-content-center">  <!-- Центрирование -->
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-stretch">
                        <img src="${user.avatar}" class="img-fluid rounded-start w-100 h-100 object-fit-cover" alt="${user.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${user.name}</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><p class="card-text"><strong>Position:</strong> ${user.position}</p></li>
                                <li class="list-group-item"><p class="card-text"><strong>Department:</strong> ${user.department}</p></li>
                                <li class="list-group-item"><p class="card-text"><strong>Email:</strong> ${user.email}</p></li>
                                <li class="list-group-item"><p class="card-text"><strong>Phone:</strong> ${user.phone}</p></li>
                                <li class="list-group-item">
                                    <strong>Desired Vacation Month:</strong> <select id="vacationMonth" class="form-select">
                                        <option value="" disabled selected>Valitse kuukausi</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </li>
                                <li class="list-group-item"><p class="card-text"><strong>Approved Vacation Month:</strong> ${user.approvedVacationMonth}</p></li>
                            </ul>
                            <p class="card-text"><small class="text-body-secondary">Role: ${user.role}</small></p>
                            <button class="btn btn-primary mt-3" onclick="submitVacationRequest('${user.id}')">Отправить запрос</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
}

// Function for sending a request to the server
function submitVacationRequest(userId) {
    //console.log("user id in the request send function: ", userId);
    const selectedMonth = document.getElementById("vacationMonth").value;
    
    if (!selectedMonth) {
        alert("Choose a month of vacation!");
        return;
    }

    fetch("/api/request-vacation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, month: selectedMonth })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Request sent for review!");
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => console.error("Error sending request:", error));
}

// Function for rendering the employee table
function renderStaffTable(staff) {
    if (!Array.isArray(staff) || staff.length === 0) {
        document.getElementById("main_alue").innerHTML += "<p>No data to display</p>";
        return;
    }
    
    let tableHTML = `
        </br>
        <table border="1" class="table table-striped">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Approved Vacation Month</th>
                </tr>
            </thead>
            <tbody>
    `;

    staff.forEach(person => {
        tableHTML += `
            <tr>
                <td><img src="${person.avatar}" alt="${person.name}" width="50"></td>
                <td>${person.name}</td>
                <td>${person.department}</td>
                <td>${person.position}</td>
                <td>${person.role}</td>
                <td>${person.email}</td>
                <td>${person.phone}</td>
                <td>${person.approvedVacationMonth || "Not specified"}</td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;

    document.getElementById("main_alue").innerHTML += tableHTML;
}

// Function loadStaffLimited() to load a table without the column “month of vacation”
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
        .catch(error => console.error("Error loading employees:", error));
}

// Function for rendering the admin panel with a table of employees with the selected vacation month
function renderAdminPanel() {
    fetch("/api/get-vacation-requests")
        .then(response => response.json())
        .then(data => {
            let tableContent = data.requests.map(req => `
                <tr>
                    <td>${req.name}</td>
                    <td>${req.month}</td>
                    <td>${req.status === "pending" ? "Odottamassa" : req.status}</td>
                    <td>${req.status === "pending" ? "Ei määritelty" : req.approvedDate}</td>
                    <td>
                        ${req.status === "pending" ? `
                            <button class="btn btn-success btn-sm" onclick="approveRequest('${req.userId}')">✅ hyväksyä</button>
                            <button class="btn btn-danger btn-sm" onclick="declineRequest('${req.userId}')">❌ hylätä</button>
                        ` : ""}
                    </td>
                </tr>
            `).join("");

            document.getElementById("adminPanel").innerHTML = "";
            document.getElementById("adminPanel").innerHTML += `
                </br>
                <h2 class="text-center">Lomapyynnöt</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Työntekijä</th>
                            <th>Kuukausi</th>
                            <th>Tila</th>
                            <th>Päivämäärä</th>
                            <th>Toiminnot</th>
                        </tr>
                    </thead>
                    <tbody>${tableContent}</tbody>
                </table>
            `;
        })
        .catch(error => console.error("Error loading requests:", error));
}

// Functions for Approve and Reject Buttons (Admin)
function approveRequest(userId) {
    fetch("/api/approve-vacation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Request approved!");
            renderAdminPanel();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => console.error("Error:", error));
}

function declineRequest(userId) {
    fetch("/api/decline-vacation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Request rejected!");
            renderAdminPanel();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => console.error("Error:", error));
}