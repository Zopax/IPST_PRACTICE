function identicalLetters(firstString, secondString) {
    var result = "";
    for (var _i = 0, firstString_1 = firstString; _i < firstString_1.length; _i++) {
        var letterF = firstString_1[_i];
        for (var _a = 0, secondString_1 = secondString; _a < secondString_1.length; _a++) {
            var letterS = secondString_1[_a];
            if (letterF.toLowerCase() == letterS.toLowerCase() && letterS != " ") {
                result += letterS;
                break;
            }
        }
    }
    return result;
}
var f = "asdffg";
var s = "asdqffwe";
console.log("\n\u0421\u0442\u0440\u043E\u043A\u0430 1: ".concat(f, "\n\u0421\u0442\u0440\u043E\u043A\u0430 2: ").concat(s, "\n\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ") + identicalLetters(f, s));
