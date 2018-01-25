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
exports.book_create_post = function(req, res, next) {
    // res.send('NOT IMPLEMENTED: BookInstance create POST');   
    // var upload = multer({ dest: './uploads/' });
    // upload.single('fileUpload'), function(req,res,next){
    // 	res.res.status(200).next();
    // }

    var book = new Book(req.body);
    book.save(function(err){
    	if (err) { return next(err); }
    	
    	res.status(200).redirect('/books');
    });
};




//GET Upload form
exports.book_upload_get = function(req, res, next){
	res.render('add_file', {title: 'Add file'});
};



// POST upload files
// exports.book_upload_post = function(req, res, next){
// 	//file upload    
// 	var upload = multer({
// 		storage: storage
// 	}).single('file')
// 	upload(req, res, function(err) {
// 		res.end('File is uploaded')
// 	})
//     //end of file upload
// };




// Display Book update form on GET.
exports.book_edit_get = function(req, res, next) {
    Book.findOne({_id: req.params.id}).exec(function(err, data){
   		if (err) { return next(err); }
   		//Successful, so render
      	res.render('add_book', { title: 'Edit Book', book_author: data.author, book_title: data.title, book_description: data.description, book_status: data.status });
     });
};

// Handle Book update on POST.
exports.book_edit_post = function(req, res, next) {
	var book = new Book({
		author: req.body.author,
		title: req.body.title,
		description: req.body.description,
		_id: req.params.id,
	});
	
    Book.findByIdAndUpdate(req.params.id, book, {}, function(err, thebook){
    	if (err) { return next(err); }
       // Successful - redirect to book detail page.
       res.redirect(thebook.url);       
    })
};


//DELETE
exports.book_delete = function(req, res, next){
	Book.findOne({_id: req.params.id}, function(err, doc){
		if (err) { return next(err); }
		doc.remove();
		res.redirect('/');
	});
}