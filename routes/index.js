var express = require('express');
var router = express.Router();
const model = require('../models/model');
const requestModel = require('../models/requests');
const bcrypt = require('bcrypt');

const waste2credit = 10;
const waste2money = 1;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{'user':req.session});
});

router.get('/about',function(req, res){
  res.render('about');
});

router.get('/login', function(req, res) {
  res.render('login', {
    message: req.flash('message')
  });
});

router.get('/register', function(req, res) {
  res.render('register', {
    errors: req.flash('errors')
  });
});

router.post('/register', (req,res,next) => {
    // var usermodel = new model();
    if (req.body.type == "general") {
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

  router.get('/logout', function(req, res) {
  req.session.destroy(function(err){
     if(err){
        console.log(err);
     }else{
         res.redirect('/login');
     }
  });

});

  router.post('/login', (req,res,next) => {
      // var usermodel = new model();
      if (req.body.type == "general") {
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
      type.findOne( { username: req.body.username}, function(err, user) {
        if(!user){
          req.flash('message', 'No such username')
          return res.redirect('/login')
        }
        else {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            req.flash('message', 'Oops! Wrong Password');
            res.redirect('/login')
          }
          else {
            req.session.user = user;
            req.session.type = req.body.type;
            console.log(req.session.user);
            if (req.body.type == "general") {
              res.redirect('/generalProfile');
            }
            else if (req.body.type == "worker") {
              res.redirect('/workerProfile');
            }
            else if (req.body.type == "collector") {
              res.redirect('/collectorProfile');
            }
            else if (req.body.type == "industry") {
              res.redirect('/industryProfile');
            }
            else{
              res.redirect('/buyerProfile');
            }
          }
        }
      })
    });

    router.get('/generalProfile',function(req, res){
      res.render('generalProfile', {
        message: req.flash('message')
      });
    });
    router.get('/workerProfile',function(req, res){
      res.render('workerProfile');
    });
    router.get('/industryProfile',function(req, res){
      res.render('industryProfile');
    });
    router.get('/buyerProfile',function(req, res){
      res.render('buyerProfile');
    });
    router.post('/generalProfile', function(req, res) {
      var request = requestModel(req.body);
      request.username = req.session.user.username;
      request.save(function(err,user){
        if (err) return next(err);
        req.flash('message', "Successfully submitted")
        res.redirect('/generalProfile')
      })
    });


    router.get('/collectorProfile', function(req, res) {
      if(req.session.user) {
        var query = requestModel.find();
        query.select('username type location address');

        query.exec(function(err, request){
          if (err) throw err;
          res.render('collectorProfile', { "requests": request})
        });
      }
      else {
        req.flash('message','You need to Login');
        res.redirect('/login')
      }
    })

    router.post('/wastecollection',function(req,res) {
      // var ob = { paper : req.body.paper , metal : req.body.metal , cardboard : req.body.cardboard , plastic : req.body.plastic ,glass : req.body.glass };
      var tcredit = parseInt(req.body.paper) + parseInt(req.body.metal) + parseInt(req.body.cardboard) + parseInt(req.body.plastic) + parseInt(req.body.glass);
      // console.log(req.session);
      // console.log(tcredit);
      model.workerModel.findOneAndUpdate( { username: req.session.user.username }, { $inc : { paper : parseInt(req.body.paper), metal : parseInt(req.body.metal), cardboard : parseInt(req.body.cardboard), plastic : parseInt(req.body.plastic), glass : parseInt(req.body.glass) }})
      .then(
      model.generalModel.findOneAndUpdate( { username: req.body.username }, { $inc : { credit : parseInt(tcredit)}  }).then(res.redirect('/workerProfile')).catch((error) => {console.log(error)})
      .then()
      .catch((error) => {console.log(error)
      }))
      .catch((error) => {console.log(error)
      })

    });

module.exports = router;
