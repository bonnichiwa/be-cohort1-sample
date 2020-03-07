const fs = require("fs");
const { promisify } = require("util");
const { validationResult } = require("express-validator");

const booksData = require("../../../db/greatreads.data.json");

const writeFile = promisify(fs.writeFile);

const listBooks = (req, res) => {
  return res.json({
    data: booksData
  });
};

const postBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const bookID = (
    parseInt(booksData.data[booksData.data.length - 1].bookID) + 1
  ).toString();

  const newBooksData = {
    data: [...booksData.data, { bookID, ...req.body }]
  };
  await writeFile("db/greatreads.data.json", JSON.stringify(newBooksData));
  res.status(201);
  return res.json({
    bookID,
    ...req.body
  });
};

const updateBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { bookID } = req.params;
  let foundBook = null;

  const newBooksData = {
    data: [...booksData.data].map(book => {
      if (book.bookID === bookID) {
        book = { bookID, ...req.body };
        foundBook = book;
      }
      return book;
    })
  };

  if (!foundBook) {
    // Create a new book entry if not found
    await writeFile(
      "db/greatreads.data.json",
      JSON.stringify({ data: [...booksData.data, { bookID, ...req.body }] })
    );
    res.status(201);
    return res.json({
      bookID,
      ...req.body
    });
  } else {
    // Update book entry if found
    await writeFile("db/greatreads.data.json", JSON.stringify(newBooksData));
    res.status(200);
    return res.json({
      bookID,
      ...req.body
    });
  }
};

const deleteBook = async (req, res) => {
  const { bookID } = req.params;

  const newBooksData = {
    data: [...booksData.data].filter(book => book.bookID !== bookID)
  };

  if (newBooksData.data.length === booksData.data.length) {
    // Send message back if no book is found
    res.status(404);
    return res.json({
      data: "No book found to delete."
    });
  } else {
    // Delete book entry if found
    await writeFile("db/greatreads.data.json", JSON.stringify(newBooksData));
    res.status(200);
    return res.json({
      bookID,
      ...req.body
    });
  }
};

module.exports = {
  listBooks,
  postBook,
  updateBook,
  deleteBook
};
