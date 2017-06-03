//require
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var port = 8080;


//use
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//listen
app.listen(port, function(){
  console.log('server up on 8080');
});
//get index.html on the page
app.get('/', function(req,res){
  console.log('url hit on /');
  res.sendFile(path.resolve('public/views/index.html'));
}); // end get / get request 
