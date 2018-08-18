var express = require('express');
var router = express.Router();

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
  res.render('register');
});

router.post('/register', (req,res,next) => {
    var usermodel = new userModel();
  userModel.findOne( { username: req.body.username}, function(err, existing) {
    if(existing){
      req.flash('errors', 'Username already taken')
      return res.redirect('/register')
    }
    else {
      userModel.findOne({ email: req.body.email}, function(err, existingUser) {
        if (existingUser) {
          console.log(existingUser);
          req.flash('errors', 'A user with that email address already exists');
          return res.redirect('/register');
        } else {
          var user = new userModel(req.body);
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(usermodel.password, salt, function(err, hash) {
              if (err) return err;
              usermodel.password = hash;
              usermodel.save(function(err, user) {
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
