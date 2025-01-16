type Gadget = {
    id: string;
    name: string;
    price: string | undefined;
};

type UserBase = {
    id: string;
    name: string;
};

type UserWithGadget<T extends Gadget> = UserBase & {
    gadget: T;
};

type UserWithGadgets<T extends Gadget> = UserBase & {
    gadgets: T[];
};

const transformData = <T extends Gadget>(users: UserWithGadget<T>[]): UserWithGadgets<T>[] => {
    const userMap = new Map<string, UserWithGadgets<T>>();

    for (const item of users) {
        if (userMap.has(item.id)) {
            const user = userMap.get(item.id) as UserWithGadgets<T>;
            user.gadgets.push(item.gadget);
            userMap.set(item.id, user);
        } else {
            userMap.set(item.id, {
                id: item.id,
                name: item.name,
                gadgets: [item.gadget]
            })
        }
    }
    
    return Array.from(userMap.values());
}

const users: UserWithGadget<Gadget>[] = [
    {
      id: "1",
      name: "Alice",
      gadget: { id: "101", name: "IPhone 13", price: "1000" },
    },
    {
      id: "2",
      name: "Bob",
      gadget: { id: "102", name: "Tablet XP-Pen", price: undefined },
    },
    {
      id: "1",
      name: "Alice",
      gadget: { id: "103", name: "Laptop MSI Katana", price: "1500" },
    },
];

function main() {
    const output: UserWithGadgets<Gadget>[] = transformData(users);
    console.log(output);
}

main();