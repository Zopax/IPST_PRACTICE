interface SourceData {
    title: string,
    year: number,
    author: string,
};

interface TargetData {
    title: string,
    year: number,
    author: string,
    preview: string,
    url: string,
}

function createBook (book: SourceData): TargetData {
    return {
        title: book.title,
        year: book.year,
        author: book.author,
        preview: `Название: ${book.title}, Автор: ${book.author}, Год: ${book.year}`,
        url: `www.someurl.com/preview?title=${book.title}&year=${book.year}&author=${book.author}`,
    };
};

const book: SourceData = {
  title: "Harry Potter",
  year: 1997,
  author: "J.K. Rowling",
};

const target: TargetData = createBook(book);
console.log(target);