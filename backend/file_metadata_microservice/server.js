require('dotenv').config()
var express = require('express');
var cors = require('cors');
const multer  = require('multer')
const bodyParser = require("body-parser");
const path = require("path");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.route("/api/fileanalyse")
  .post(multer().single("upfile"), (req, res) => {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
      });
  });


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
