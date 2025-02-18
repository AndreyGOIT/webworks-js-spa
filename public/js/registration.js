document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("Форма регистрации отправлена");
        });
    } else {
        console.error("Ошибка: форма регистрации не найдена!");
    }
});