const fs = require("fs");
const { promisify } = require("util");

const booksData = require("../../../db/greatreads.data.json");

const writeFile = promisify(fs.writeFile);

const listBooks = (req, res) => {
  return res.json({
    data: booksData
  });
};

const postBook = async (req, res) => {
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

module.exports = {
  listBooks,
  postBook
};
