var Book = require('../models/book');


//var multer = require('multer');
//var upload = multer({ dest: 'files/' });
//Multer storage settings
// var storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 		callback(null, 'public/images/')
// 	},
// 	filename: function(req, file, callback) {
// 		console.log(file)
// 		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
// 	}
// })
//End of multer storage settings


// Display list of all Books 
exports.books_list = function(req, res, next){
	Book.find({}, 'author title ').exec(function(err, data){
		if (err) { return next(err); }
		//Successful, so render
      	res.render('book_list', { title: 'Book List', book_list: data });
	})
};


// Display details page for a specific Book
exports.book_detail = function(req, res, next) {
   // res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
   Book.findOne({_id: req.params.id}).exec(function(err, data){
   		if (err) { return next(err); }
   		//Successful, so render
      	res.render('book_details', { title: 'Book Details', book_detail: data });
   })
};

// Display Book create form on GET.
exports.book_create_get = function(req, res, next) {	
    res.render('add_book', {title: 'Add'});
};

// Handle Book create on POST.
// exports.book_create_post = function(req, res, next) {
//     var book = new Book(req.body);
//     book.save(function(err){
//     	if (err) { return next(err); }    	
//     	res.status(200).redirect('/books');
//     });
// };


// Display Book update form on GET.
exports.book_edit_get = function(req, res, next) {
    Book.findOne({_id: req.params.id}).exec(function(err, data){
   		if (err) { return next(err); }
   		//Successful, so render
      	res.render('edit_book', 
      		{ title: 'Edit Book', 
      		book_author: data.author, 
      		book_title: data.title,
      	 	book_description: data.description, 
      	 	book_status: data.status,
      	 	book_fileUpload: data.fileUpload,
      	 	});
     });
};

// Handle Book update on POST.
// exports.book_edit_post = function(req, res, next) {
// 	var book = new Book({
// 		_id: req.params.id,
// 		author: req.body.author,
// 		title: req.body.title,
// 		description: req.body.description,
// 		status: req.body.status,
// 		//fileUpload: req.file.path		
// 	});
	
//     Book.findByIdAndUpdate(req.params.id, book, {}, function(err, thebook){
//     	if (err) { return next(err); }
//        // Successful - redirect to book detail page.
//        res.redirect(thebook.url);       
//     })
// };






exports.book_download = function(req, res, next){
	Book.findOne({_id: req.params.id}).exec(function(err, data){
		if (err) { return next(err); }
		var filePath = data.fileUpload;
		var fileName = "book.pdf";
		res.download(filePath, fileName);
	});	
}

//DELETE
exports.book_delete = function(req, res, next){
	Book.findOne({_id: req.params.id}, function(err, doc){
		if (err) { return next(err); }
		doc.remove();
		res.redirect('/');
	});
}