const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  //#1
  test('#1 Translation with text and locale fields: POST request to /api/translate', function (done) {
    let input = {
      text: "My favorite color is transparent.",
      locale: "american-to-british"
    };
    let translation = 'My <span class="highlight">favourite</span> <span class="highlight">colour</span> is transparent.'

    chai
      .request(server)
      .post("/api/translate")
      .set("content-type", "application/json")
      .send(input)
      .end( function (err,res) {
        if (err) {console.log(err)};
        assert.equal(res.status, 200);
        assert.equal(res.body.text, input.text);
        assert.equal(res.body.translation, translation);
      });
      done();
  });
  //#2
  test('#2 Translation with text and invalid locale field: POST request to /api/translate', function (done) {
    let input = {
      text: "This text here is quite pointless.",
      locale: "veryinvalidlocalefieldhahahahsueme"
    };
    chai
      .request(server)
      .post("/api/translate")
      .set("content-type", "application/json")
      .send(input)
      .end( function (err,res) {
        if (err) {console.log(err)};
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field');
      });
      done();
  });
  //#3
  test('#3 Translation with missing text field: POST request to /api/translate', function (done) {
    let input = {
      locale: "british-to-american"
    };
    chai
      .request(server)
      .post("/api/translate")
      .set("content-type", "application/json")
      .send(input)
      .end( function (err,res) {
        if (err) {console.log(err)};
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
      });
      done();
  });
  //#4
  test('#4 Translation with missing locale field: POST request to /api/translate', function (done) {
    let input = {
      text: "What do you expect to happen?"
    };
    chai
      .request(server)
      .post("/api/translate")
      .set("content-type", "application/json")
      .send(input)
      .end( function (err,res) {
        if (err) {console.log(err)};
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
      });
      done();
  });
  //#5
  test('#5 Translation with empty text: POST request to /api/translate', function (done) {
    let input = {
      text: "",
      locale: "british-to-american"
    };
    chai
      .request(server)
      .post("/api/translate")
      .set("content-type", "application/json")
      .send(input)
      .end( function (err,res) {
        if (err) {console.log(err)};
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'No text to translate');
      });
      done();
  });
  //#6
  test('#6 Translation with text that needs no translation: POST request to /api/translate', function (done) {
    let input = {
      text: "This translation is pointless because it has no special words that would be characteristic to either British or American English.",
      locale: "british-to-american"
    };
    chai
      .request(server)
      .post("/api/translate")
      .set("content-type", "application/json")
      .send(input)
      .end( function (err,res) {
        if (err) {console.log(err)};
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, "Everything looks good to me!");
      });
      done();
  });
});
