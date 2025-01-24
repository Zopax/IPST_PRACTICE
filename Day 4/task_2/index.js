var transformData = function (users) {
    var userMap = new Map();
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var item = users_1[_i];
        if (userMap.has(item.id)) {
            var user = userMap.get(item.id);
            user.gadgets.push(item.gadget);
            userMap.set(item.id, user);
        }
        else {
            userMap.set(item.id, {
                id: item.id,
                name: item.name,
                gadgets: [item.gadget]
            });
        }
    }
    return Array.from(userMap.values());
};
var users = [
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
    var output = transformData(users);
    console.log(output);
}
main();
