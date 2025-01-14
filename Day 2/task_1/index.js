var countFilledValues = function (obj) {
    if (!obj) {
        return 0;
    }
    var count = 0;
    for (var key in obj) {
        var value = obj[key];
        if (value != null && value != undefined && value != "") {
            count++;
        }
    }
    return count;
};
var data = {
    name: "Alice",
    age: 25,
    address: "",
    phone: undefined,
    email: "[alice@example.com](<mailto:alice@example.com>)",
};
console.log(countFilledValues(data));
