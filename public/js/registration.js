// Vierailijarekisteröintilomakkeen lähetystä käsitellään tässä

document.addEventListener("submit", async function (event) {
    const form = event.target;
    
    if (form && form.id === "guestRegisterForm") {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();

            if (!name || !email || !phone) {
                alert("Täytä kaikki kentät!");
                return;
            }

            fetch("/api/register-guest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Rekisteröinti onnistui!");
                    document.getElementById("guestFormContainer").style.display = "none";
                    document.getElementById("staffTableContainer").style.display = "block";
                    loadStaffLimited(); // Ladataan taulukko
                } else if (data.alreadyRegistered) {
                    alert("Olet jo rekisteröitynyt! Mene henkilökunnan taulukkoon.");
                    document.getElementById("guestFormContainer").style.display = "none";
                    document.getElementById("staffTableContainer").style.display = "block";
                    loadStaffLimited(); // Ladataan taulukko
                } else {
                    alert("Rekisteröintivirhe: " + data.error);
                }
            })
            .catch(error => console.error("Guest Registration API Error: ", error));
        }
});