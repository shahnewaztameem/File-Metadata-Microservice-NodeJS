'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({dest: '/uploads'});
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});



app.post('/api/fileanalyse',upload.single('upfile'),  (req, res, next) => {
  var name = req.file.originalname;
  var type = req.file.mimetype;
  var size = req.file.size;
  res.json({name: name, type: type, size: size});
  next();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
