var express = require('express');
var router = express.Router();
const model = require('../models/model');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about',function(req, res){
  res.render('about');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register', {
    errors: req.flash('errors')
  });
});

router.post('/register', (req,res,next) => {
    // var usermodel = new model();
    if (req.body.type == "public") {
      var type = model.generalModel;
    }
    else if (req.body.type == "worker") {
      var type = model.workerModel;
    }
    else if (req.body.type == "collector") {
      var type = model.collectorModel;
    }
    else if (req.body.type == "industry") {
      var type = model.industryModel;
    }
    else{
      var type = model.buyerModel;
    }
    type.findOne( { username: req.body.username}, function(err, existing) {
      if(existing){
        req.flash('errors', 'Username already taken')
        return res.redirect('/register')
      }
      else {
        type.findOne({ email: req.body.email}, function(err, existingUser) {
          if (existingUser) {
            console.log(existingUser);
            req.flash('errors', 'A user with that email address already exists');
            return res.redirect('/register');
          } else {
            var user = new type(req.body);
            // user.name = req.body.name;
            // user.username = req.body.username;
            // user.email = req.body.email;
            // user.contact = req.body.contact;
            // user.address = req.body.address;
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return err;
                user.password = hash;
                user.save(function(err, user) {
                  if (err) return next(err);
                  res.redirect('/login');
                });
              });
            });
          }});

      }
    })
  });

module.exports = router;
