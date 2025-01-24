interface Book {
  title: string;
  year: number;
  author: string;
}

interface BookWithPreviewAndUrl extends Book {
  preview: string;
  url: string;
}

function createBook(book: Book): BookWithPreviewAndUrl {
  const { title, year, author } = book;


  const preview = `Название: ${title}, Автор: ${author}, Год: ${year}`;
  const url = `www.someurl.com/preview?title=${title}&year=${year}&author=${author}`;

  return {
    ...book,
    preview,
    url,
  };
}

const book: Book = {
  title: "Harry Potter",
  year: 1997,
  author: "J.K. Rowling",
};

const target: BookWithPreviewAndUrl = createBook(book);
console.log(target);
