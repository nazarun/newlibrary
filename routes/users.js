var express = require('express');
var router = express.Router();
var User = require('../models/user');

//POST for Login and Signup
router.post('/signup', function (req, res, next) {

  req.checkBody('email', 'Enter a valid email address').isEmail();
  req.checkBody('password', 'Password required, min 5 symbols').isLength({min:5});
  //errors handling
  var errors = req.validationErrors();
  if (errors) {   
    return res.status(403).send({error: errors});    
  } else {
    // normal processing here
    var userData = {
      email: req.body.email,      
      password: req.body.password,   
    };

    User.create(userData, function (error, user) {
      if (error) {          
        return res.status(403).send({error: [{ msg: "Something went wrong. User is not created" }] });
      } else {
        req.session.userId = user._id;
        res.status(200).redirect('/books'); 
      }
    });
  }
});

  // Login code
router.post('/login', function (req, res, next) {
   
  req.checkBody('logemail', 'Wrong email address').isEmail();
  req.checkBody('logpassword', 'Wrong password, min 5 symbols').isLength({min:5});
  //errors handling
  var errors = req.validationErrors();
  if (errors) {   
    return res.status(403).send({error: errors});    
  } else {
    // normal processing here
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {        
        return res.status(403).send({error: [{ msg: "Wrong email or password" }] }); 
      } else {
        req.session.userId = user._id;
        return res.status(200).redirect('/books');
      }
    });
  }  
});


// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {          
          return res.status(403).send({error: 'Not authorized! Please login or signup'});
        } else {
          return res.send( user.email );
        }
      }
    });
});

// GET for logout 
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/users/login');
      }
    });
  }
});

module.exports = router;