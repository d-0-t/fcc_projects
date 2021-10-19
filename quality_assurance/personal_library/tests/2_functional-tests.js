const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { then } = require('../mongodb-setup');
const { expect } = require('chai');
require("../mongodb-setup");

chai.use(chaiHttp);

suite('Functional Tests', function() {

  let idToMod1;

  suite('Routing tests', function() {
    suite('POST /api/books with title => create book object/expect book object', function() {
      test('Test POST /api/books with title', function() {
        return new Promise(function (resolve) {
          let random = Math.floor(Math.random()*100000);
          let input = { title: "Perpendicular adventures " + random};
          chai
            .request(server)
            .post("/api/books")
            .set("content-type", "application/json")
            .send(input)
            .end( async function (err,res) {
              if (err) {console.log(err)};
              assert.equal(res.status, 200);
              assert.equal(res.body.title, input.title);
              idToMod1 = res.body._id
              resolve();
            });
        });        
      });
      test('Test POST /api/books with no title given', function(done) {
        let input = { title: "" };
        chai
          .request(server)
          .post("/api/books")
          .set("content-type", "application/json")
          .send(input)
          .end( function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "missing required field title");
          });
        done();
      });
    });


    suite('GET /api/books => array of books', async function(){
      test('Test GET /api/books',  function(done){
        chai
          .request(server)
          .get("/api/books")
          .set("content-type", "application/json")
          .end( function (err,res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
          });
        done();
      });      
    });

    suite('GET /api/books/[id] => book object with [id]', function(){
      test('Test GET /api/books/[id] with id not in db',  function(done){
        let input = { id: "someRandomIdThatDoesNotExist" };
        chai
          .request(server)
          .get("/api/books/" + input.id)
          .set("content-type", "application/json")
          .end( function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists");
          });
        done();
      });
      test('Test GET /api/books/[id] with valid id in db',  async function(done){
        let input = { id: idToMod1 };
        chai
          .request(server)
          .get("/api/books/" + input.id)
          .set("content-type", "application/json")
          .end( function (err,res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'commentcount', 'Books in object should contain commentcount');
            assert.property(res.body, 'comments', 'Books in object should contain an array of comments');
            assert.property(res.body, 'title', 'Books in object should contain title');
            assert.property(res.body, '_id', 'Books in object should contain _id');
          });
        done();
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      test('Test POST /api/books/[id] with comment', function(done){
        let input = {
          id: idToMod1,
          comment: "I'd love to comment on this imaginary book with the appended random number, but it will get deleted by the end of the test anyway."
        };
        chai
          .request(server)
          .post("/api/books/" + idToMod1)
          .set("content-type", "application/json")
          .send(input)
          .end( function (err,res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'commentcount', 'Books in object should contain commentcount');
            assert.property(res.body, 'comments', 'Books in object should contain an array of comments');
            assert.property(res.body, 'title', 'Books in object should contain title');
            assert.property(res.body, '_id', 'Books in object should contain _id');
            assert.equal(res.body._id, idToMod1, "The _id should match");
            assert.equal(res.body.comments[0], input.comment, "The new comment should match");
          });
        done();
      });
      test('Test POST /api/books/[id] without comment field', function(done){
        let input = { id: idToMod1 };
        chai
          .request(server)
          .post("/api/books/" + idToMod1)
          .set("content-type", "application/json")
          .send(input)
          .end( function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "missing required field comment");
          });
        done();
      });
      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        let input = {
          id: "thisIdIsDefinitelyNotInTheDatabase",
          comment: "Haha, it's not like this will ever end up being seen, right? RIGHT?!"
        };
        chai
          .request(server)
          .post("/api/books/" + input.id)
          .set("content-type", "application/json")
          .send(input)
          .end( function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists");
          });
        done();
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {
      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        let input = {id: idToMod1};
        chai 
          .request(server)
          .delete("/api/books/" + idToMod1)
          .send(input)
          .end( function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.text, "delete successful");
          });
        done();
      });
      test('Test DELETE /api/books/[id] with id not in db', function(done){
        let input = {id: "veryInvalidId"};
        chai 
          .request(server)
          .delete("/api/books/" + input.id)
          .send(input)
          .end( function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists");
          });
        done();
      });
    });
  });
});
