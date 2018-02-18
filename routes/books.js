var express = require('express');
var router = express.Router();
// Require controller modules.
var book_controller = require('../controllers/bookController');
var Book = require('../models/book');

var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

//GET all books (Main page)
router.get('/:page', book_controller.books_list);

// POST request for creating Book
router.post('/create', upload.single('file'), book_controller.book_create_post);
 
// GET request for one Book.
router.get('/:page/:id', book_controller.book_detail);

// Search
router.post('/search', book_controller.book_search);

// POST request to edit Book.
router.post('/:id', upload.single('file'), book_controller.edit_book_post);

//Download Book
router.get('/:page/:id/download', book_controller.book_download);

//DELETE Book
router.delete('/:id', book_controller.book_delete);

module.exports = router;