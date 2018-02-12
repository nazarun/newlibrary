var express = require('express');
var router = express.Router();
// Require controller modules.
var book_controller = require('../controllers/bookController');
var Book = require('../models/book');

var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

//Book routes//

//GET all books (Main page)
router.get('/:page', book_controller.books_list);

// POST request for creating Book.
router.post('/create', upload.single('file'), function(req,res,next){
	var book = new Book({
		author: req.body.author,
		title: req.body.title,
		description: req.body.description,
		status: req.body.status,
		fileUpload: req.file.path
	});
	book.save(function(err){
		if (err) { return next(err); }    	
	res.sendStatus(200);
	});	
}); 
  
 
// GET request for one Book.
router.get('/:page/:id', book_controller.book_detail);

router.post('/search', book_controller.book_search);

// POST request to edit Book.
router.post('/:id', upload.single('file'), function(req, res, next) {
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
       // res.status(200).redirect(thebook.url); 
       res.sendStatus(200);  
    })
});


//Download Book
router.get('/:page/:id/download', book_controller.book_download);

//DELETE Book
router.delete('/:id', book_controller.book_delete);

module.exports = router;