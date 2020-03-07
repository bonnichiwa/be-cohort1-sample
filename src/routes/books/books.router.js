const express = require("express");

const {
  listBooks,
  postBook,
  updateBook,
  deleteBook
} = require("./books.controller");

const router = express.Router();

router.get("", listBooks);
router.post("", postBook);
router.put("/:bookID", updateBook);
router.delete("/:bookID", deleteBook);

module.exports = {
  booksRouter: router
};
