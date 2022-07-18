const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookHandler = (r, h) => {
  const { name, reading, finished } = r.query;

  if (name !== undefined && name.trim().length > 0) {
    books.filter((bookName) => bookName.name.toLowerCase().includes(name.toLowerCase()));
    const filterBook = books.filter((book) => {
      const regex = new RegExp(name, 'gi');
      return regex.test(book.name);
    });
    const response = h.response({
      status: 'success',
      data: {
        books: filterBook.map((bodyRequest) => ({
          id: bodyRequest.id,
          name: bodyRequest.name,
          publisher: bodyRequest.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  if (reading !== undefined) {
    const readStatus = books.filter((book) => Number(book.reading) === Number(reading));
    const response = h.response({
      status: 'success',
      data: {
        books: readStatus.map((bodyRequest) => ({
          id: bodyRequest.id,
          name: bodyRequest.name,
          publisher: bodyRequest.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  if (finished !== undefined) {
    const readStatus = books.filter((book) => Number(book.finished) === Number(finished));
    const response = h.response({
      status: 'success',
      data: {
        books: readStatus.map((bodyRequest) => ({
          id: bodyRequest.id,
          name: bodyRequest.name,
          publisher: bodyRequest.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((bodyRequest) => ({
        id: bodyRequest.id,
        name: bodyRequest.name,
        publisher: bodyRequest.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, response) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  // const response = h.response({
  //   status: 'fail',
  //   message: 'Buku tidak ditemukan',
  // });
  // response.code(404);
  return response.status(400).message('Buku tidak ditemukan');
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
