const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    version: String
})

const BooksModel = mongoose.model("books", bookSchema);

BooksModel.findBooks = function (req, callBack) {
    let id = req.query.id;
    let query = {};
    if (id) {
        query = { _id: id }
    }
    BooksModel.find(query, callBack);
}

BooksModel.addBook = function (req, callBack) {
    let book = req.body;
    BooksModel.create(book, callBack);
}

BooksModel.updateBook = function (req, callBack) {
    let query = { _id: req.body._id };
    let book = req.body;
    BooksModel.updateOne(query, book, callBack);
}

BooksModel.deleteBook = function (req, callBack) {
    let query = { _id: req.query.id };
    BooksModel.deleteOne(query, callBack);
}

module.exports = BooksModel;
