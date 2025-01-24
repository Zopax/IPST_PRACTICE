;
var data = [
    { "id": "123", "name": "Alice", "email": "email1@example.com" },
    { "id": "234", "name": "Bob", "email": "email2@example.com" },
    { "id": "345", "name": "Jilly", "email": "email3@example.com" },
];
var festData = function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(data);
        }, 2000);
    });
};
festData().then(function (users) {
    console.log("Данные получены:\n", users);
}).catch(function (error) {
    console.error("Ошибка при загрузке данных: ", error);
});
