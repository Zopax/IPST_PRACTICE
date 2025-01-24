interface User {
    id: string,
    name: string,
    email: string,
};

const data: User[] = [
    {"id": "123", "name": "Alice", "email": "email1@example.com"},
    {"id": "234", "name": "Bob", "email": "email2@example.com"},
    {"id": "345", "name": "Jilly", "email": "email3@example.com"},
];

const festData = (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
}

festData().then((users) => {
    console.log("Данные получены:\n", users);
}).catch((error) => {
    console.error("Ошибка при загрузке данных: ", error);
});