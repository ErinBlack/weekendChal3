var express = require('express');
var router = express.Router();

router.get('/allTasks', function(req, res){
  console.log('executed get tasks');
  res.send(200);
});

module.exports = router;
