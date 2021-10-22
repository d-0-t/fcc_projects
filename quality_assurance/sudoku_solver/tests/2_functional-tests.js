const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('SOLVE', () => {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
      let input = { puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." };
      let output = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/json")
        .send(input)
        .end(function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, output);
          done();
        });
      });
      test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
      let input = { };
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/json")
        .send(input)
        .end(function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field missing")
          done();
        });
      });
      test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
      let input = { puzzle: "can't solve this because it is not a sudoku4.3.7.2..9.47...8..1..16....926914.37." };
      let output = "Invalid characters in puzzle";
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/json")
        .send(input)
        .end(function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, output);
          done();
        });
      });
      test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
      let input = { puzzle: "iLoveCake123"};
      let output = "Expected puzzle to be 81 characters long";
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/json")
        .send(input)
        .end(function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, output);
          done();
        });
      });
      test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
      let input = { puzzle: ".79..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.." };
      let output = "Puzzle cannot be solved";
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/json")
        .send(input)
        .end(function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, output);
          done();
        });
      });
    });
        
    
    suite('CHECK', () => {    
      test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
        let input = {
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "7"
        };
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, true)
            done();
          });
        });
      test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
        let input = {
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "6"
        };
        let conflict = [ "column" ];
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false);
            assert.deepEqual(res.body.conflict, conflict);
            done();
          });
        });
      test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
        let input = {
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "8"
        };
        let conflict = [ "column", "region" ];
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false);
            assert.deepEqual(res.body.conflict, conflict);
            done();
          });
        });
      test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
        let input = {
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "5"
        };
        let conflict = [ "row", "column", "region" ];
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false);
            assert.deepEqual(res.body.conflict, conflict);
            done();
          });
        });
      test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
        let input = { puzzle: "x"};
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Required field(s) missing")
            done();
          });
        });
      test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
        let input = {
          puzzle: "can't solve this because it is not a sudoku4.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "A1",
          value: "1"
        };
        let output = "Invalid characters in puzzle";  
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.error, output);
            done();
          });
        });
      test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
        let input = {
          puzzle: "iReallyWantToEatMyCakeNow...", 
          coordinate: "A1",
          value: "1"
        };
        let output = "Expected puzzle to be 81 characters long";;
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.error, output);
            done();
          });
        });
      test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
        let input = {
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "Firefly should come back for another season.",
          value: "1"
        };
        let output = "Invalid coordinate";
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.error, output);
            done();
          });
        });
      test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
        let input = {
          puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "I WANT CAKE!!!!!!!!!!!!!"
        };
        let output = "Invalid value";
        chai
          .request(server)
          .post("/api/check")
          .set("content-type", "application/json")
          .send(input)
          .end(function (err,res) {
            if (err) {console.log(err)};
            assert.equal(res.status, 200);
            assert.equal(res.body.error, output);
            done();
          });
        });
    });
});