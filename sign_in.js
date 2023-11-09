function login() {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    // Проверка на пустоту
    if (login.trim() === '' || password.trim() === '') {
        alert('Введите логин и пароль!');
        return;
    }

    // Проверка на правильность email
    var emailRegex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(login)) {
        alert('Введите корректный email!');
        return;
    }

    // Проверка на правильность пароля (например, не менее 6 символов)
    if (password.length < 6) {
        alert('Пароль должен содержать не менее 6 символов!');
        return;
    }
    var xhr = new XMLHttpRequest();

    // Настраиваем его для отправки POST-запроса на сервер
    xhr.open('POST', 'https://localhost:7024/user/loginReg/log', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Создаем объект с данными для отправки на сервер
    var data = {
        email: login,
        password: password
    };

    // Преобразуем объект в JSON-строку
    var jsonData = JSON.stringify(data);

    // Отправляем POST-запрос на сервер с данными в формате JSON
    xhr.send(jsonData);

    // Обрабатываем ответ от сервера
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response != "-1"){
            localStorage.setItem('id', response);
            if(response !== ''){
                // Переходим на страницу "home.html"
                window.location.href = 'main.html';
              }}
              else{
                alert("Нереверный пароль!");
              }
        }
    };
    // Все проверки пройдены, можно отправлять данные на сервер или выполнять другие действия
}
function reg() {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    var confPassword = document.getElementById("Confpassword").value;

    // Проверка на пустоту
    if (login.trim() === '' || password.trim() === '') {
        alert('Введите логин и пароль!');
        return;
    }
    if (confPassword.trim()===''){
         alert('Подтвердите пароль!');
        return;
    }

    // Проверка на правильность email
    var emailRegex = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(login)) {
        alert('Введите корректный email!');
        return;
    }

    // Проверка на правильность пароля (например, не менее 6 символов)
    if (password.length < 6) {
        alert('Пароль должен содержать не менее 6 символов!');
        return;
    }
    if (password != confPassword){
        alert('Пароли должны совпадать!');
        return;
    }
    var xhr = new XMLHttpRequest();

    // Настраиваем его для отправки POST-запроса на сервер
    xhr.open('POST', 'https://localhost:7024/user/loginReg/reg', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Создаем объект с данными для отправки на сервер
    var data = {
        email: login,
        password: password,
        confirmPassword:confPassword
    };

    // Преобразуем объект в JSON-строку
    var jsonData = JSON.stringify(data);

    // Отправляем POST-запрос на сервер с данными в формате JSON
    xhr.send(jsonData);

    // Обрабатываем ответ от сервера
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response != "-1"){
            localStorage.setItem('id', response);
            if(response !== ''){
                // Переходим на страницу "home.html"
                window.location.href = 'main.html';
              }}
              else{
                alert("Что-то не так!");
              }
        }
    };
    // Все проверки пройдены, можно отправлять данные на сервер или выполнять другие действия
}