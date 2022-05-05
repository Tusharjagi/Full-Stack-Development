var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

const cors = require('./cors');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.options('*', cors.corsWithOptions, (req,res) => {res.sendStatus(200);} )
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    } else {
      res.statusCode = 200;
      res.setHeader('Content_type', 'application/json');
      res.json(users);
    }
  })
});

router.post('/signup', cors.corsWithOptions,  (req, res, next) => {
  User.register(new User({
      username: req.body.username
    }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          err: err
        });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err, user) => {
          passport.authenticate('local')(req, res, () => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({
                err: err
              });
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: true,
              status: 'Registration Successful!'
            });
          });
        });
      }
    });
});



router.post('/login',cors.corsWithOptions, (req, res,next) => {

  passport.authenticate('local',(err, user, info)  => {
    if(err)
      return next(err);

    if(!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: false,
        status: 'Login Unsuccessfull', 
        err: info
      });
    }
    req.logIn(user, (err) => {
      if(err) { 
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({
        success: false,
        status: 'Login Unsuccessfull', 
        err: 'Could not login user'
      });
      }

        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
        success: true,
        status: 'Login Successfull', 
        token: token});
    });
  })(req, res, next);
 
});

router.get('/logout',cors.corsWithOptions, (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not loggend in !!');
    err.status = 403;
    next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req,res)=> {
    if(req.user) {
      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
      success: true,
      token: token,
      status: 'You are successfully logged in!'
      });

    }
} )

router.get('/checkJWTToken' ,cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session:false}, (err, user, info) => {
    if(err)
      return next(err);
    
    if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid', success:false, err: info});

    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT Valid', success:true, user: user});
    }
  }) (req,res);
});

module.exports = router;
