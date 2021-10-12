'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert")
    .get((req, res) => {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let spellInitUnit = convertHandler.spellOutUnit(initUnit);
      let spellReturnUnit = convertHandler.spellOutUnit(returnUnit);
      let toString = convertHandler.getString(initNum, returnNum, spellInitUnit, spellReturnUnit);

      let responseObject = {};
      responseObject["initNum"] = initNum;
      responseObject["initUnit"] = initUnit;
      responseObject["returnNum"] = returnNum;
      responseObject["returnUnit"] = returnUnit;
      responseObject["string"] = toString;

      function whiteSpaces(arg) {
        let whiteRegex = /[\s]+/;
        return whiteRegex.test(input);
      }

      if (initNum === "invalid number" && initUnit === "invalid unit" || input === "" || whiteSpaces(input)) {
        responseObject = "invalid number and unit";
      } else if (initNum === "invalid number" && initUnit !== "invalid unit") {
        responseObject = "invalid number";
      } else if (initUnit === "invalid unit" && initNum !== "invalid number" ) {
        responseObject = "invalid unit";
      }
      
      res.json(responseObject);
    });

};
