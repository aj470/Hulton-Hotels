var express = require('express');
var app = express();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../db/conn');


app.post('/register', function(req,res){
  console.log('in the register function')
  // initialize json object to be written to the database
  var today = new Date();
  var uuid = Math.round((new Date()).getTime() / 1000);
  var user={
    "name":req.body.name,
    "address":req.body.address,
    "email":req.body.email,
    "password":req.body.password,
    "phone_no": req.body.phone,
    "cid":uuid
  }
  console.log(req.body)
  // check that all fields of data are valid
  req.check({name: {notEmpty: true}, email: {notEmpty: true, isEmail: true, },
                password: {notEmpty: true}, address: {notEmpty: true}, phone: {notEmpty: true}});
  req.getValidationResult()
  .then(function(errors) {
    if (!errors.isEmpty()) {
      console.log("validation errors");
      return res.status(400).send('Bad Request');
    } else {
      // check if email already exists
      db.query('SELECT count(*) as count from Customer WHERE email = ?', req.body.email, function(error, results, fields) {
        if (error) {
          console.log("query errors")
          return done(null, false);
        } else {
          // if no records exist, insert new record
          if (results[0].count == 0) {
            db.query('INSERT INTO Customer SET ?',user, function (error, results, fields) {
              if (error) {
                console.log("error occurred",error);
                return res.status(400).send('Error occurred');
              }else{
                return res.status(200).send(user);
              }
            });
          } else {
            console.log("pre-existing email errors")
            return res.status(400).send('email already exists');
          }
        }
      })
    }
  })
});

passport.use(new localStrategy(function (username, password, done) {
  // find the user
  // if successful, return done(null, user)
  console.log('hi from the authentication function')
  db.query('SELECT * FROM Customer WHERE email = ?',username, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      return done(null, false);
    }else{
      if(results.length > 0){
        if(results[0].Password == password){
          return done(null, results[0]);
        }
      }
      return done(null, false);
    }
  });
}));

passport.serializeUser(function(user, done) {
  console.log("user is now serialized");
  done(null, user);
});


passport.deserializeUser(function(user, done) {
  done(null, user);
});

// login route
app.post('/', passport.authenticate('local'), function(req,res, next){
  console.log('login successful');
  if (req.isAuthenticated()){
    console.log("req is authenticated ");
    console.log(req.user);
  }
  res.send(req.user);
});


app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.send("logged out");
});

module.exports = app;