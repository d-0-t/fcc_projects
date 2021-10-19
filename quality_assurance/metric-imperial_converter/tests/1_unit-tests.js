const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

let spelledUnits = [ "liters", "gallons", "kilograms", "pounds", "kilometers", "miles"];
let validUnits = [ "L", "gal", "kg", "lbs", "km", "mi" ];
let responseArray = [ "gal", "L", "lbs", "kg", "mi", "km" ];
let inputArray = [
      [ "l", "L" ],
      [ "gal", "GAL" ],
      [ "kg", "KG" ],
      [ "lbs", "LBS" ],
      [ "km", "KM" ],
      [ "mi", "MI" ]
];

suite('Unit Tests', function(){
  //#1 
  test("Whole number input", function (done) {
    let input = "420kg";
    assert.equal(convertHandler.getNum(input),420);
    done();
  });
  //#2
  test("Decimal number input", function (done) {
    let input = "3.2L";
    assert.equal(convertHandler.getNum(input),3.2);
    done();
  });
  //#3 
  test("Fractional input", function (done) {
    let input = "1/3gal";
    assert.equal(convertHandler.getNum(input),1/3);
    done();
  });
  //#4 
  test("Fractional input with a decimal", function (done) {
    let input = "2.5/5mi";
    assert.equal(convertHandler.getNum(input),2.5/5);
    done();
  });
  //#5 
  test("Correct error on double fraction", function (done) {
    let input = "2/3/4L";
    assert.equal(convertHandler.getNum(input),"invalid number");
    done();
  });
  //#6 
  test("Default num to 1 if there is no value", function (done) {
    let input = "kg";
    assert.equal(convertHandler.getNum(input),1);
    done();
  });
  //#7 
  test("Correctly read each valid input unit", function (done) {
    for (let i = 0; i < inputArray.length; i++) {
      inputArray[i].forEach(function(unit) {
        assert.equal(convertHandler.getUnit(unit),validUnits[i]);
      });
    }
    done();
  });
  //#8 
  test("Error for invalid input unit", function (done) {
    let input = "3.5asdfASDFasdfASDfadf";
    assert.equal(convertHandler.getUnit(input),"invalid unit");
    done();
  });
  //#9 
  test("Correct return unit for each valid input unit", function (done) {
    for (let i = 0; i < inputArray.length; i++) {
      inputArray[i].forEach(function(unit) {
        assert.equal(
        convertHandler.getReturnUnit(
          convertHandler.getUnit(unit)
          ),responseArray[i]);
      });
    }
    done();
  });
  //#10
  test("Correctly return each spelled-out string input unit", function (done) {
    for (let i = 0; i < validUnits.length; i++) {
        assert.equal(convertHandler
        .spellOutUnit(validUnits[i]),spelledUnits[i]);
    }
    done();
  });
  //#11 
  test("Correctly convert gal to L", function (done) {
    let initialNumber = 5.7;
    let initialUnit = "gal";
    assert.approximately(convertHandler.convert(initialNumber, initialUnit),21.57684,0.00001);
    done();
  });
  //#12 
  test("Correctly convert L to gal", function (done) {
    let initialNumber = 30;
    let initialUnit = "L";
    assert.approximately(convertHandler.convert(initialNumber, initialUnit),7.92517,0.00001);
    done();
  });
  //#13 
  test("Correctly convert mi to km", function (done) {
    let initialNumber = 4.2;
    let initialUnit = "mi";
    assert.approximately(convertHandler.convert(initialNumber, initialUnit),6.75923,0.00001);
    done();
  });
  //#14 
  test("Correctly convert km to mi", function (done) {
    let initialNumber = 1/3;
    let initialUnit = "km";
    assert.approximately(convertHandler.convert(initialNumber, initialUnit),0.20712,0.00001);
    done();
  });
  //#15 
  test("Correctly convert lbs to kg", function (done) {
    let initialNumber = 666;
    let initialUnit = "lbs";
    assert.approximately(convertHandler.convert(initialNumber, initialUnit),302.09227,0.00001);
    done();
  });
  //#16
  test("Correctly convert kg to lbs", function (done) {
    let initialNumber = 333;
    let initialUnit = "kg";
    assert.approximately(convertHandler.convert(initialNumber, initialUnit),734.13993,0.00001);
    done();
  });
});