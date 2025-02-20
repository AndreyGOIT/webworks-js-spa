// Обработка submit формы регистрации посетителя

document.addEventListener("submit", async function (event) {
    const form = event.target;
    
    if (form && form.id === "guestRegisterForm") {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();

            if (!name || !email || !phone) {
                alert("Заполните все поля!");
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
                    alert("Регистрация успешна!");
                    document.getElementById("guestFormContainer").style.display = "none";
                    document.getElementById("staffTableContainer").style.display = "block";
                    loadStaffLimited(); // Загружаем таблицу
                } else if (data.alreadyRegistered) {
                    alert("Вы уже зарегистрированы! Переход к таблице персонала.");
                    document.getElementById("guestFormContainer").style.display = "none";
                    document.getElementById("staffTableContainer").style.display = "block";
                    loadStaffLimited(); // Загружаем таблицу
                } else {
                    alert("Ошибка регистрации: " + data.error);
                }
            })
            .catch(error => console.error("Ошибка API регистрации гостя: ", error));
        }
});