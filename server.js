//require
var express = require('express');
var app = express();
var index = require('./routes/index');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var port = 8080;
var addTask = require('./routes/addTask');



//use
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', index);

//listen
app.listen(port, function(){
  console.log('server up on 8080');
});
//get index.html on the page
