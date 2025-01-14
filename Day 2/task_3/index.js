;
function createBook(book) {
    return {
        title: book.title,
        year: book.year,
        author: book.author,
        preview: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435: ".concat(book.title, ", \u0410\u0432\u0442\u043E\u0440: ").concat(book.author, ", \u0413\u043E\u0434: ").concat(book.year),
        url: "www.someurl.com/preview?title=".concat(book.title, "&year=").concat(book.year, "&author=").concat(book.author),
    };
}
;
var book = {
    title: "Harry Potter",
    year: 1997,
    author: "J.K. Rowling",
};
var target = createBook(book);
console.log(target);
