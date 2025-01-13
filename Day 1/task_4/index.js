if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        if (count < 0) {
            throw new Error('Count cannot be negative');
        }
        var result = '';
        for (var i = 0; i < count; i++) {
            result += this;
        }
        return result;
    };
}
function runLengthEncoding(str) {
    if (!str) {
        return "";
    }
    var encoded = "";
    var count = 1;
    for (var i = 0; i < str.length; i++) {
        if (i + 1 < str.length && str[i] === str[i + 1]) {
            count++;
        }
        else {
            encoded += str[i] + count;
            count = 1;
        }
    }
    return encoded;
}
function runLengthDecoding(encodedStr) {
    if (!encodedStr) {
        return "";
    }
    var decoded = "";
    var i = 0;
    while (i < encodedStr.length) {
        var char = encodedStr[i];
        i++;
        var countStr = "";
        while (i < encodedStr.length && !isNaN(parseInt(encodedStr[i]))) {
            countStr += encodedStr[i];
            i++;
        }
        var count = parseInt(countStr);
        decoded += char.repeat(count);
    }
    return decoded;
}
var strToEncode = "AAAABBBCCDAA";
var encoded = runLengthEncoding(strToEncode);
console.log("\u0417\u0430\u043A\u043E\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430 \"".concat(strToEncode, "\": ").concat(encoded));
var strToDecode = "A4B3C2D1A2";
var decoded = runLengthDecoding(strToDecode);
console.log("\u0420\u0430\u0441\u043A\u043E\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430 \"".concat(strToDecode, "\": ").concat(decoded));
