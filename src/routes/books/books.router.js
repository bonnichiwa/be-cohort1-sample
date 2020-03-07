const express = require("express");

const { listBooks, postBook } = require("./books.controller");

const router = express.Router();

router.get("", listBooks);
router.post("", postBook);

module.exports = {
  booksRouter: router
};
