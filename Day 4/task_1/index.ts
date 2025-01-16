interface User {
    id: number,
    name: string,
    email: string
    isActive: boolean,
};

async function cleanUserData(users: User[]): Promise<User[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject(new Error("Случайная ошибка при обработке данных"));
            } 

            const cleanedUsers = users.filter((user) => user.isActive).map((user) => ({
                ...user,
                name: user.name.toLowerCase().trim(),
                email: user.email.toLowerCase(),
            }));
            resolve(cleanedUsers);
        }, 1000);
    });
}

const users: User[] = [
    { id: 1, name: "  John Doe  ", email: "John.Doe@example.com", isActive: true },
    { id: 2, name: "Jone Smith", email: "JONE.SMITH@example.com", isActive: false },
    { id: 3, name: "  Peter Parker", email: "peter.parker@example.com", isActive: true },
    { id: 4, name: "Alice", email: "ALICE@example.com", isActive: true },
];

async function main() {
    try {
      const cleanedUsers = await cleanUserData(users);
      console.log("Очищенные данные:", cleanedUsers);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
}
  
main();