const express = require("express");
const { check } = require("express-validator");

const {
  listBooks,
  postBook,
  updateBook,
  deleteBook
} = require("./books.controller");
const { validateBody } = require("../../middleware/validate-body");

const router = express.Router();

const booksRequestBodyCheck = [
  check("title")
    .not()
    .isEmpty(),
  check("authors")
    .not()
    .isEmpty(),
  check("average_rating")
    .not()
    .isEmpty(),
  check("isbn")
    .not()
    .isEmpty(),
  check("isbn13")
    .not()
    .isEmpty(),
  check("# num_pages")
    .not()
    .isEmpty(),
  check("ratings_count")
    .not()
    .isEmpty(),
  check("text_reviews_count")
    .not()
    .isEmpty()
];

router.get("", listBooks);
router.post("", booksRequestBodyCheck, validateBody, postBook);
router.put("/:bookID", booksRequestBodyCheck, validateBody, updateBook);
router.delete("/:bookID", deleteBook);

module.exports = {
  booksRouter: router
};
