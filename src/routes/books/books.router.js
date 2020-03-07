const express = require("express");

const { listBooks } = require("./books.controller");

const router = express.Router();

router.get("", listBooks);

module.exports = {
  booksRouter: router
};
