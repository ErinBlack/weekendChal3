var express = require('express');
var router = express.Router();
var path = require('path');

//get index page
router.use('/', function (req, res) {
  res.sendFile(path.resolve('./public/views/index.html'));
});

module.exports = router;