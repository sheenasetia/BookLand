const express = require('express');
const router = express.Router();
const BooksModel = require('./../models/books');

router.get('', (req, res) => {
    BooksModel.findBooks(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            console.log("Success response is: ", response[0].version);
            res.send(response);
        }
    });
});

router.post('/addBook', (req, res) => {
    BooksModel.addBook(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.put('/updateBook', (req, res) => {
    BooksModel.updateBook(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.delete('/deleteBook', (req, res) => {
    BooksModel.deleteBook(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

module.exports = router;