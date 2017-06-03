//require
var express = require('express');
var app = express();
var index = require('./routes/index');
var addTask = require('./routes/addTask');
var getTasks = require('./routes/getTasks')
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var port = 8080;




//use
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', index);
app.get('/addTask', addTask);
app.get('getTasks', getTasks);

//listen
app.listen(port, function(){
  console.log('server up on 8080');
});
//get index.html on the page
