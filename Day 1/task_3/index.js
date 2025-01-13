function indexOf(str, sub) {
    if (sub.length > str.length) {
        return -1;
    }
    for (var i = 0; i <= str.length - sub.length; i++) {
        var currentSub = str.substring(i, i + sub.length);
        if (currentSub === sub) {
            return i;
        }
    }
    return -1;
}
var str2 = "programming is fun";
var sub2 = "fun";
var index2 = indexOf(str2, sub2);
console.log("\u0418\u043D\u0434\u0435\u043A\u0441 \"".concat(sub2, "\" \u0432 \"").concat(str2, "\": ").concat(index2));
