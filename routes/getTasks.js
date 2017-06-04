var express = require('express');
var router = express.Router();
var path = require('path');

//getting all tasks from the database
router.use('/allTasks', function(req, res){
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
module.exports = router;
