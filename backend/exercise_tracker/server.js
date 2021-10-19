require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userSchema = new Schema({
  username: { type: String, required: true, unique: false },
  count: { type: Number, default: 0},
  log: [{
         description: String,
         duration: Number,
         date: String
       }]
});


const User = mongoose.model("User", userSchema);

console.log("MongoDB Connection state: " + mongoose.connection.readyState);

app.route("/api/allog")
  .get((req, res) => {
    //list all users(_id, username)
    User.find({}, function(err,data) {
      if (err) return console.error(err);
      res.send(data);
    });
  })

app.route("/api/users")
  .get((req, res) => {
    //list all users(_id, username)
    User.find({}).select({count:0, log:0, __v:0}).exec(function(err,data) {
      if (err) return console.error(err);
      res.send(data);
    });
  })
  .post((req, res) => {
    let newUserName = req.body.username;
    let newUserArr = { username: newUserName };

    User.findOne({username: newUserName}, function(err,data) {
      if (err) { return console.error(err); }
      if (!data) { //if user is not present in db, save it
        let newUser = new User(newUserArr);
        newUser.save(function(err, data) {
          if (err) {
            return console.error(err);
          }
          res.json({
            username: data.username,
            _id: data._id
          });
        });
      } else { //if user is already present in db, show it
        res.json({
          username: data.username,
          _id: data._id
        });
      }
    });
  });

app.route("/api/users/:id/exercises")
  .post((req, res) => {
    let id = req.params.id;
    let description = req.body.description;
    let duration = Number(req.body.duration);
    let date = new Date(req.body.date);
    let today = new Date().toDateString();
    if (date == "Invalid Date") {
      date = today;
    } else {
      date = date.toDateString();
    }
    let exerciseArr = {
          description: description,
          duration: duration,
          date: date
    };
    User.findOneAndUpdate({_id: id}, { $inc: { count: 1 }, $push: { log: exerciseArr }}, { new: true }, function(err,updated) {
      if (err) {console.log(err)};
      if (!updated) {
        res.send({});
        console.log("no such _id in database");
      } else if (!description) {
        res.send({});
        console.log("invalid description");
      } else if (!duration) {
        res.send({});
        console.log("invalid duration");
      } else {
        let returnedArr = {
          _id: updated.id,
          username: updated.username,
          date: date,
          duration: duration,
          description: description
        };
        res.json(returnedArr);
      }
    });
  });

  app.route("/api/users/:id/logs")
  .get((req, res) => {
    let { id } = req.params;
    let { from, to, limit } = req.query;
    from = new Date(from);
    to = new Date(to);
    let lim = Math.floor(Number(limit));
    let fromDate = new Date(0);
    let toDate = new Date();

    if (from != "Invalid Date") {
      fromDate = from;
    }
    if (to != "Invalid Date") {
      toDate = to;
    }
    if (!lim) {
      lim = 9999999;
    }

    fromDate = fromDate.getTime();
    toDate = toDate.getTime();

    User.findById(id).select({log:{_id:0}}).exec(function(err,data) {
      if (err) return console.error(err);
      if (!data) {
        res.send("no such _id in database");
      } else {
        let logSelection = [];

        if (lim >= data.log.length) {
          lim = data.log.length
        }
        for( i = 0; i < data.log.length; i++) {
          let dateCheck = new Date(data.log[i].date);
          dateCheck = dateCheck.getTime();

          if (dateCheck >= fromDate && dateCheck <= toDate) {
            logSelection.push(data.log[i]);
          }
        }
        logSelection = logSelection.slice(0,lim);
        
        let selection = {
          _id: data._id,
          username: data.username,
          count: data.count,
          log: logSelection
        }
        
        res.json(selection);
      }
    });
  });


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});