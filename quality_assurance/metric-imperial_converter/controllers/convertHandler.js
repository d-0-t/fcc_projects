function ConvertHandler() {
  
  this.getNum = function(input) {
    let fracRegex = /^[\d]*[.\d]*[/][.\d]*$/;

    let result = input.split(/[a-zA-Z]+/).join('');

    if (fracRegex.test(result)) {
      result = result.split("/");
      if (result[0] === "") { result[0] = 1 }
      if (result[1] === "") { result[1] = 1 }
      result = Number(result[0]) / Number(result[1]);
    }

    if (result === "") { result = 1 }
    result = Number(result);

    if (isNaN(result)) {
      return result = "invalid number";
      }
    else { return result; }
  };

  this.getUnit = function(input) {
    let units = ["mi", "km", "gal", "l", "lbs", "kg"];
    let result = input.split(/^[^a-zA-Z]+/).join('');
    if (units.includes(result.toLowerCase())) {
      if (result === "L" || result === "l") {
        return result = "L";
      } else {
        return result.toLowerCase();
      }
    } else {
      return result = "invalid unit";
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();
    switch(initUnit) {
      case "km": result = "mi"; break;
      case "mi": result = "km"; break;
      case "lbs": result = "kg"; break;
      case "kg": result = "lbs"; break;
      case "gal": result = "L"; break;
      case "l": result = "gal"; break;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    let stringifyUnit = {
      mi: "miles",
      km: "kilometers",
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms"
    }
    return result = stringifyUnit[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    let op;
    initUnit = initUnit.toLowerCase();

    if (initUnit === "gal" || initUnit === "l")  { op = galToL }
    if (initUnit === "lbs" || initUnit === "kg") { op = lbsToKg }
    if (initUnit === "mi"  || initUnit === "km") { op = miToKm }

    if (initUnit === "gal" || initUnit === "lbs" || initUnit === "mi") {
      result = Math.round(100000 * initNum * op) / 100000;
    } else {
      result = Math.round(100000 * initNum / op) / 100000;
    }
    return result;
  };
  
  this.getString = function(initNum, returnNum, spellInitUnit, spellReturnUnit) {
    let result;
    
    result = initNum + " " + spellInitUnit + " converts to " + returnNum + " " + spellReturnUnit;
    
    return result;
  };
}

module.exports = ConvertHandler;
