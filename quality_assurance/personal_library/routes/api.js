'use strict';
var ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  comments: [ String ],
  commentcount: { type: Number, default: 0 }
});
const BookModel = mongoose.model("Book", BookSchema);

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      BookModel.find({}).select({__v: 0})
      .exec((err, data) => {
        if (err) {
          console.log(err); res.send(err);
          return 0;
        }
        res.json(data);
      });
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.send("missing required field title");
        return 0;
      }
      BookModel.findOne({ title: title }, (err, data) => {
        if (err) {
          console.log(err); res.send(err);
          return 0;
        }
        if (data) {
          res.send("Book already exists in the library.");
          return 0;
        }
        let newBook = new BookModel({
          title: title,
          comments: [],
          commentcount: 0
        });
        newBook.save((err, updata) => {
          if (err) {
            console.log(err); res.send(err);
            return 0;
          }
          res.json({
            _id: updata._id,
            title: updata.title
          });
        });
      });
    })

    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      BookModel.remove({}, (err,data) => {
        if (err) {
          console.log(err); res.send(err);
          return 0;
        }
        res.send("complete delete successful");
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookID = req.params.id;
      BookModel.findOne({_id: bookID}).select({__v: 0})
      .exec((err, data) => {
        if (err) {
          res.send("no book exists");
          return 0;
        }
        if (!data) {
          res.send("no book exists");
          return 0;
        }
        res.json(data);
      });
    })
    
    .post(function(req, res){
      let bookID = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        res.send("missing required field comment");
        return 0;
      }
      if (!bookID) {
        res.send("missing required field id");
        return 0;
      }
      BookModel.findOneAndUpdate({ _id: bookID },
        { $push: { comments: comment}, $inc: { commentcount: 1 }},
        { new: true }, (err, data) => {
        if (!data) {
          res.send("no book exists");
          return 0;
        }
        res.json({
          _id: data._id,
          title: data.title,
          comments: data.comments,
          commentcount: data.commentcount
        });
      });
    })

    .delete(function(req, res){
      let bookID = req.params.id;
      if (!bookID) {
        res.send("missing required field id");
        return 0;
      }
      BookModel.findByIdAndRemove(bookID, (err,data) => {
        if (!data) {
          res.send("no book exists");
          return 0;
        }
        res.send("delete successful");
      });
    });
};
