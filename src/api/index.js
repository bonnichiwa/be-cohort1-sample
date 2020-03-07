const express = require("express");

const { healthRouter } = require("../routes/health/health.router");
const { booksRouter } = require("../routes/books/books.router");

const router = express.Router();
router.use("/health", healthRouter);
router.use("/books", booksRouter);

module.exports = router;
