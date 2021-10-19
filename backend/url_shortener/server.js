require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/* This regex function is from an unknown author, let me know if you know who constructed it so I can give them credit! Thanks!

SOURCE: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
*/

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i');
  return pattern.test(str);
}

//Initialize bodyParser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Construct Schema and Model for MongoDB

const urlSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: Number
});

const Shorts = mongoose.model("Shorts", urlSchema);


//Handle shortened url requests with redirection if the shortcut exists

const findShort = (shortId, res, done) => {
  Shorts.findOne({short_url: shortId}, function(err,data) {
    if (err) { return console.error(err); }
    if (!data) {
      res.send(`{"error":"short url undefined"}`);
    } else {
      res.redirect(data.original_url);
    }
  });
};

app.get('/api/shorturl/:num', function(req, res) {
  let { num } = req.params;
  findShort(num, res);
});


//Construct a new shortcut

let newArray;

app.route("/api/shorturl")
  .get((req, res) => {
    let { url: original } = req.query;
    res.send("Invalid query.");
  })
  .post((req, res) => {

    let string = req.body.url;

    if (validURL(string)) {
      let counter = Shorts.countDocuments({}).then(r => { return r });

      counter.then(function(result) {

        Shorts.findOne({original_url: string}, function(err,data) {
          if (err) { return console.error(err); }

          newArray = {
            original_url: string,
            short_url: result
          };

          if (!data) { //if orig url not present in db, save it
            res.json(newArray);
            let newShort = new Shorts(newArray);

            newShort.save(function(err, data) {
              if (err) {
                return console.error("Some kind of (t)error. " + err);
              }
              return data;
            });
          } else { //if orig url is present in db, show it (do not redirect)
            res.json({
              original_url: data.original_url,
              short_url: data.short_url
            });
          }
        });
      });
    } else {
      res.json({
        error: "invalid url"
      });
    }
  });


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});