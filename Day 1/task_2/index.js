function longestWord(str) {
    var words = str.split(' ');
    var result = "";
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        if (word.length >= result.length) {
            result = word;
        }
    }
    return result;
}
console.log(longestWord("sgssdf efesdgg as"));
