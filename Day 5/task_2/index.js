var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var nominals = [100, 50, 10, 5, 2, 1];
var splitAmount = function (amount) {
    var _a;
    if (amount <= 0 || !Number.isInteger(amount)) {
        throw new Error("Сумма должна быть целым положительным числом.");
    }
    var result = { 100: 0, 50: 0, 10: 0, 5: 0, 2: 0, 1: 0 };
    var remainingSum = amount;
    for (var _i = 0, nominals_1 = nominals; _i < nominals_1.length; _i++) {
        var nominal = nominals_1[_i];
        var count = Math.floor(remainingSum / nominal);
        result = __assign(__assign({}, result), (_a = {}, _a[nominal] = count, _a));
        remainingSum -= count * nominal;
    }
    return result;
};
function main() {
    console.log(splitAmount(123));
    console.log(splitAmount(555));
    console.log(splitAmount(100));
    console.log(splitAmount(7));
    console.log(splitAmount(1));
    try {
        console.log(splitAmount(-10));
    }
    catch (e) {
        console.error(e);
    }
}
main();
