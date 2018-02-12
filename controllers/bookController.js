var Book = require('../models/book');

//Pagination
exports.books_list = function(req, res, next){
  if(req.session.userId){
    var docsPerPage = 5;
    var page = req.params.page || 1;

    Book.findPaginated({}, function(err, result){
    if (err) throw err;
    //console.log(req.params);
    //console.log(result);
    res.send(result);
    }, docsPerPage, page);

  }  
};

//Search
exports.book_search = function(req, res, next){
  //console.log(req.body.search);
  Book.find({ $or: [ {'title': req.body.search }, {'author': req.body.search} ]}).exec(function(err, data){
      if (err) { return next(err); }      
        res.status(200).send(data);
        //console.log(data);
   })
}

// Display details page for a specific Book
exports.book_detail = function(req, res, next) {
//console.log(req.params);   
  Book.findOne({_id: req.params.id}).exec(function(err, data){
   		if (err) { return next(err); }   		
        res.status(200).send(data);
   })
};

// Handle Book create on POST.
// exports.book_create_post = function(req, res, next) {
//     var book = new Book(req.body);
//     book.save(function(err){
//     	if (err) { return next(err); }    	
//     	res.status(200).redirect('/books');
//     });
// };

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
	Book.count({_id: req.params.id}, function(err, count){
    if (err) { return next(err); }
    if(count > 0){
      Book.findOne({_id: req.params.id}, function(err, data){
        if (err) { return next(err); }
        data.remove();
        res.sendStatus(200);
      });
    }else{
      next();
    }    
  });
}