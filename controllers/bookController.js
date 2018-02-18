var Book = require('../models/book');

//Pagination
exports.books_list = function(req, res, next){
  if(req.session.userId){
    var docsPerPage = 5;
    var page = req.params.page || 1;

    Book.findPaginated({}, function(err, result){
    if (err) throw err;    
    res.send(result);
    }, docsPerPage, page);

  }  
};

//Search
exports.book_search = function(req, res, next){  
  Book.find({ $or: [ {'title': req.body.search }, {'author': req.body.search} ]}).exec(function(err, data){
      if (err) { return next(err); }           
      res.status(200).send(data);
      console.log(req.body.search);
      console.log(data);        
   })
}

// Display details page for a specific Book
exports.book_detail = function(req, res, next) {
  Book.count({_id: req.params.id}, function(err, count){
    if(err){return next(err);}
    if(count > 0){
      Book.findOne({_id: req.params.id}).exec(function(err, data){
      if (err) { return next(err); }      
        res.status(200).send(data);
      })
    }else{
      res.sendStatus(404);
    }
  });  
};

// Handle Book create on POST.
exports.book_create_post = function(req, res, next) {
  req.checkBody('author', 'Author field is required').notEmpty();
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('description', 'Description field is required').notEmpty();
  req.checkBody('status', 'status field is required').notEmpty();

  var errors = req.validationErrors();
  //custom check file field
  if(req.file === undefined){
    if(errors === false) {errors = [];}
    errors.push({msg: "File is required"});
  }
  
  if (errors) {   
    return res.status(403).send({error: errors});    
  } else {

    if(req.session.userId){
      var book = new Book({
      author: req.body.author,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      fileUpload: req.file.path
      });
      book.save(function(err){
        if (err) { return next(err); }      
      res.status(200).send("New book added successfully");
      });        
    }else{
      if(errors === false) {errors = [];}
      errors.push({msg: "Please login to add new book"});
      res.status(403).send({error: errors});      
    }        
  }  
};

// Handle Book update on POST.
exports.edit_book_post = function(req, res, next) {
  req.checkBody('author', 'Author field is required').notEmpty();
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('description', 'Description field is required').notEmpty();
  req.checkBody('status', 'status field is required').notEmpty();

  var errors = req.validationErrors();
  //custom check file field
  if(req.file === undefined){
    if(errors === false) {errors = [];}
    errors.push({msg: "File is required"});
  }
  
  if (errors) {   
    return res.status(403).send({error: errors});    
  } else {
    var book = new Book({
      _id: req.params.id,
      author: req.body.author,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      fileUpload: req.file.path   
    });
  
    Book.findByIdAndUpdate(req.params.id, book, {}, function(err, thebook){
      if (err) { return next(err); }       
       res.status(200).send("The book has been edited");  
    });
  }
}

//Download book
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