var express = require('express');
var router = express.Router();


//var upload = multer({ dest: 'files/' });






// Require controller modules.
var book_controller = require('../controllers/bookController');

//Book routes//

//GET all books (Main page)
router.get('/', book_controller.books_list);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/create', book_controller.book_create_get);

// POST request for creating Book.
router.post('/create', book_controller.book_create_post);

// GET request for Uploading files.
router.get('/upload', book_controller.book_upload_get);

// POST request for Uploading files.
//router.post('/upload', book_controller.book_upload_post); 
  
 
// GET request for one Book.
router.get('/:id', book_controller.book_detail);

// GET request to edit Book.
router.get('/:id/edit', book_controller.book_edit_get);

// POST request to edit Book.
router.post('/:id/edit', book_controller.book_edit_post);

//DELETE
router.get('/:id/delete', book_controller.book_delete);



module.exports = router;