var express = require('express');
var router = express.Router();
// Require controller modules.
var book_controller = require('../controllers/bookController');
var Book = require('../models/book');

var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

//Book routes//

//GET all books (Main page)
router.get('/', book_controller.books_list);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/create', book_controller.book_create_get);

// POST request for creating Book.
//router.post('/create', book_controller.book_create_post);

// POST request for creating Book.
router.post('/create', upload.single('fileUpload'), function(req,res,next){
	console.log(req.file.path);
	console.log(req.body);
	//res.send('File uploaded');
	var book = new Book({
		author: req.body.author,
		title: req.body.title,
		description: req.body.description,
		status: req.body.status,
		fileUpload: req.file.path
	});
    book.save(function(err){
    	if (err) { return next(err); }    	
    	res.status(200).redirect('/books');
    });
}); 
  
 
// GET request for one Book.
router.get('/:id', book_controller.book_detail);

// GET request to edit Book.
router.get('/:id/edit', book_controller.book_edit_get);

// POST request to edit Book.
router.post('/:id/edit', upload.single('fileUpload'), function(req, res, next) {
	var book = new Book({
		_id: req.params.id,
		author: req.body.author,
		title: req.body.title,
		description: req.body.description,
		status: req.body.status,
		fileUpload: req.file.path	 //Not Implemented - Need to add OPTIONAL file changing	
	});
	
    Book.findByIdAndUpdate(req.params.id, book, {}, function(err, thebook){
    	if (err) { return next(err); }
       // Successful - redirect to book detail page.
       res.redirect(thebook.url);       
    })
});


//Download Book
router.get('/:id/download', book_controller.book_download);

//DELETE Book
router.get('/:id/delete', book_controller.book_delete);

module.exports = router;