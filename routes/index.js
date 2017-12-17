var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
  res.send("the backend works!!");
});

module.exports = app;