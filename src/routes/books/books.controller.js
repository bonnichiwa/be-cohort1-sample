const booksData = require("../../../db/greatreads.data.json");

const listBooks = (req, res) => {
  return res.json({
    data: booksData
  });
};

module.exports = {
  listBooks
};
