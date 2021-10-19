// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// THIS SECTION IS MY CODE:

app.get("/api/", function (req, res) {
  let unixDate = new Date().getTime();
  let time = new Date(unixDate).toGMTString();

  res.json({
    unix: unixDate,
    utc: time
  });
});

app.get("/api/:string", (req,res) => {
  let { string } = req.params;
  let unixDate = "";
  let time = "";

  if (!isNaN(string)) {
    unixDate = Number(string);
  } else {
    unixDate = Date.parse(string);
  }
  time = new Date(unixDate).toGMTString();

  console.log("unix: " + unixDate + " time " + time);
  
  if (!unixDate && unixDate !== 0) {
    res.json({
    error : "Invalid Date"
  });
  } else {
    res.json({
    unix: unixDate,
    utc: time
  });
  }

});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
