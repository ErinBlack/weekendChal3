//require
var express = require('express');
var app = express();
var index = require('./routes/index');
var addTask = require('./routes/addTask');
var getTasks = require('./routes/getTasks');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var port = 8080;

//configure the database setup
var config = {
  database: 'to_do_list',
  host: 'localhost',
  port: 5432,
  max: 50
};
//database pool
var pool = new pg.Pool(config);



//use
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', index);
app.get('/addTask', addTask);
app.get('/getTasks', getTasks);

//listen
app.listen(port, function(){
  console.log('server up on 8080');
});
//get index.html on the page


//getting all tasks from the database
app.get('/allTasks', function(req, res){
  console.log('executed get tasks');
  var allTasks = [];
  //open up connection to database
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      done();
      res.send(400);
    }//end if statement
    else{
      console.log('connected to db on allTasks');
      var resultSet = connection.query("SELECT * FROM things_to_do");
      resultSet.on('row', function(row){
        allTasks.push(row);

      });// end function
      resultSet.on('end',function(){
        done();
        res.send(allTasks);
      }); //end function
    } // end else statement
  }); // end database connection
}); // end get

//posting a new task from the database
app.post('/addTask', function(req, res){
  console.log('addTask url hit');
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      done();
      res.send(400);
    }//end if statement
    else{
      console.log('connected to db on addTask');
      var taskSend = req.body.task;
      var taskStatus = req.body.completed;
      var resultSet = connection.query("INSERT INTO things_to_do(task, completed) VALUES('" + taskSend + "'," + taskStatus + ");");
      console.log('result set', resultSet);
      done();
      res.send(200);
    }//end else
  }); //end pool connection
});// end post

app.delete('/deleteTask', function(req, res){
  console.log('deleteTask url hit');
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      done();
      res.send(400);
    } //end if
    else{
      console.log('connected to db on deleteTask');
      var deleteID = req.body.id;
      console.log('deleteId', deleteID);
      var resultSet = connection.query("DELETE FROM things_to_do WHERE id = " + deleteID + ";");
      console.log('delete task result set', resultSet);
      done();
      res.send(200);
    }//end else
  });
}); // end delete

app.put('/markTaskTrue', function(req, res){
  console.log('markTask url hit');
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      done();
      res.send(400);
    }//end if
    else{
      console.log('connected to db on markTask');
      var taskID = req.body.id;
      var resultSet = connection.query("UPDATE things_to_do SET completed = true WHERE id =" + taskID + ";");
      done();
      res.send(200);
    }
  }); //end pool connection
});// end markTaskTrue

app.put('/markTaskFalse', function(req, res){
  console.log('markTaskFalse url hit');
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      done();
      res.send(400);
    }//end if
    else{
      console.log('connected to db on markTask');
      var taskID = req.body.id;
      var resultSet = connection.query("UPDATE things_to_do SET completed = false WHERE id =" + taskID + ";");
      done();
      res.send(200);
    }
  }); //end pool connection
});// end markTaskTrue
