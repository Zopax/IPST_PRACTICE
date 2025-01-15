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
var test_data = null;
console.log(countFilledValues(data));
console.log(countFilledValues(test_data));
console.log(countFilledValues(test_data));
