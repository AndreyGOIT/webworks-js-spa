// Обработка submit формы регистрации посетителя

document.addEventListener("submit", function (event) {
    const form = event.target;
    console.log("Форма регистрации найдена", form);
    if (form && form.id === "guestRegisterForm") {
            event.preventDefault();
            console.log("Форма регистрации отправлена");

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
                    loadStaffLimited(); // Загружаем таблицу без месяца отпуска
                } else {
                    alert("Ошибка получения данных при регистрации: " + data.error);
                }
            })
            .catch(error => console.error("Ошибка api регистрации гостя: ", error));
    } else {
        console.error("Ошибка: форма регистрации не найдена!");
    }
});