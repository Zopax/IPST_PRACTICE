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
function createBook(book) {
    var title = book.title, year = book.year, author = book.author;
    var preview = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435: ".concat(title, ", \u0410\u0432\u0442\u043E\u0440: ").concat(author, ", \u0413\u043E\u0434: ").concat(year);
    var url = "www.someurl.com/preview?title=".concat(title, "&year=").concat(year, "&author=").concat(author);
    return __assign(__assign({}, book), { preview: preview, url: url });
}
var book = {
    title: "Harry Potter",
    year: 1997,
    author: "J.K. Rowling",
};
var target = createBook(book);
console.log(target);
