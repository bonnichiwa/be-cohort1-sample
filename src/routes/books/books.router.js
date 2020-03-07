const express = require("express");

const { listBooks, postBook, updateBook } = require("./books.controller");

const router = express.Router();

router.get("", listBooks);
router.post("", postBook);
router.put("/:bookID", updateBook);

module.exports = {
  booksRouter: router
};
