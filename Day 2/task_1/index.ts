const countFilledValues = (obj: Record<string, unknown>) => {
    
    if (!obj) {
        return 0;
    }

    let count: number = 0;

    for (var key in obj) {
        const value = obj[key]
        if (value != null && value != undefined && value != "") {
            count++;
        }
    }
    
    return count;
} 

const data = {
    name: "Alice",
    age: 25,
    address: "",
    phone: undefined,
    email: "[alice@example.com](<mailto:alice@example.com>)",
};

console.log(countFilledValues(data));
