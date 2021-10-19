const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const mySecretPath = process.env['SECRETPATH'];
const mySecretPath2 = process.env['SECRETPATH2'];

let idToDelete1;

suite('Functional Tests', function() {
  suite('POST', function() {
    //#1
    test('#1 Create an issue with every field: POST request to /api/issues/{project}', function () {
      return new Promise(function (resolve) {
      let input = {
        issue_title: "Test 1",
        issue_text: "this is test 1",
        created_by: "Morgan",
        assigned_to: "Freeman",
        status_text: "awesome"
      };
      chai
        .request(server)
        .post("/api/issues/test")
        .set("content-type", "application/json")
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, input.issue_title);
          assert.equal(res.body.issue_text, input.issue_text);
          assert.equal(res.body.created_by, input.created_by);
          assert.equal(res.body.assigned_to, input.assigned_to);
          assert.equal(res.body.status_text, input.status_text);
          idToDelete1 = res.body._id;
          resolve();
        });
      });
    });
    //#2
    test('#2 Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
      let input = {
        issue_title: "Test 2",
        issue_text: "this is test 2",
        created_by: "KVN"
      };
      chai
        .request(server)
        .post("/api/issues/test")
        .set("content-type", "application/json")
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, input.issue_title);
          assert.equal(res.body.issue_text, input.issue_text);
          assert.equal(res.body.created_by, input.created_by);
        });
        done();
    });
    //#3
    test('#3 Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
      let input = {
        issue_title: "Test 3",
        issue_text: "this is test 3",
      };
      chai
        .request(server)
        .post("/api/issues/test")
        .set("content-type", "application/json")
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "required field(s) missing");
        });
        done();
    });
  });

  suite('GET', function() {
    //#4
    test('#4 View issues on a project: GET request to /api/issues/{project}', function (done) {
      chai 
        .request(server)
        .get("/api/issues/" + mySecretPath)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.length, 5);
        });
        done();
    });
    //#5
    test('#5 View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
      chai 
        .request(server)
        .get("/api/issues/" + mySecretPath)
        .query({ issue_title: "Totally"})
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].issue_title, "Totally");
        });
        done();
    });
    //#6
    test('#6 View issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
      chai 
        .request(server)
        .get("/api/issues/" + mySecretPath)
        .query({
          issue_title: "Failure is not an option",
          status_text: "pending" })
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].issue_title, "Failure is not an option");
          assert.equal(res.body[0].status_text, "pending");
        });
        done();
    });
  });
  suite('PUT', function() {
    //#7
    test('#7 Update one field on an issue: PUT request to /api/issues/{project}', function (done) {
      let input = {
        _id: idToDelete1,
        issue_title: "Test 1 Updated"
      }
      chai 
        .request(server)
        .put("/api/issues/test")
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, idToDelete1);
        });
        done();
    });
    //#8
    test('#8 Update multiple fields on an issue: PUT request to /api/issues/{project}', function () {
      return new Promise(function (resolve) {
      let input = {
        _id: idToDelete1,
        issue_title: "Test 1 Updated Again",
        issue_text: "And it kinda worked",
        created_by: "Testmachine",
        assigned_to: "Nobody",
        status_text: "Horrifying"
      }
      chai 
        .request(server)
        .put("/api/issues/test")
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, idToDelete1);
        });
        resolve();
      });
    });
    //#9
    test('#9 Update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
      let input = {
        _id: "",
        issue_title: "This is not gonna work"
      }
      chai 
        .request(server)
        .put("/api/issues/" + mySecretPath2)
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "missing _id");
        });
        done();
    });
    //#10
    test('#10 Update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {
      let input = {
        _id: "6169b3a11292f2190b604894"
      }
      chai 
        .request(server)
        .put("/api/issues/" + mySecretPath2)
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "no update field(s) sent");
          assert.equal(res.body._id, input._id);
        });
        done();
    });
    //#11
    test('#11 Update an issue with an invalid _id: PUT request to /api/issues/{project}', function (done) {
      let input = {
        _id: "666666666666666666666666",
        issue_title: "Good luck with that"
      }
      chai 
        .request(server)
        .put("/api/issues/" + mySecretPath2)
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "could not update");
          assert.equal(res.body._id, input._id);
        });
        done();
    });
  });
  suite('DELETE', function() {
    //#12
    test('#12 Delete an issue: DELETE request to /api/issues/{project}', function (done) {
      let input1 = {_id: idToDelete1}
      chai 
        .request(server)
        .delete("/api/issues/test")
        .send(input1)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully deleted");
          assert.equal(res.body._id, input1._id);
        });
      done();
    });
    //#13
    test('#13 Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
      let input = {_id: "GoodLuckWithThisInvalId"}
      chai 
        .request(server)
        .delete("/api/issues/test")
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "could not delete");
          assert.equal(res.body._id, input._id);
        });
      done();
    });
    //#14
    test('#14 Delete an issue with missing _id: DELETE request to /api/issues/{project}', function (done) {
      let input = {_id: ""}
      chai 
        .request(server)
        .delete("/api/issues/test")
        .send(input)
        .end( function (err,res) {
          if (err) {console.log(err)};
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "missing _id");
        });
      done();
    });
  });
});
