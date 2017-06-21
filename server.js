var express = require('express');
var hbs = require('express-handlebars');
var config = require('./config');
var multer = require('multer');
var upload = multer({dest: './uploads'});

var app = express();
var port = config.PORT;
console.log(multer)
app.use(express.static(__dirname + '/public'));

app.engine('.hbs', hbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res, next) {
 res.render('index')
});

app.post('/', upload.single('userFile'), function(req, res, next) {
  if(req.file) {
    console.dir(req.file);
    return res.json({fileSize: 'Your file size in bytes: '+ req.file.size})
  }
  else {
    res.json({message: 'Your file was not uploaded'})
  }
});

app.get('/', function(req, res, next) {
});
app.listen(port, function() {
  console.log('app listening on port '+port)
});
