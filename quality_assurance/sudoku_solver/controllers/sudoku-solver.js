const InputErrorHandlerScript = require('../controllers/inputerrorhandler.js');
let inputErrorHandler = new InputErrorHandlerScript();

let regions0 = [
  [ 0,  1,  2,  9, 10, 11, 18, 19, 20 ],
  [ 3,  4,  5, 12, 13, 14, 21, 22, 23 ],
  [ 6,  7,  8, 15, 16, 17, 24, 25, 26 ],
  [ 27, 28, 29, 36, 37, 38, 45, 46, 47 ],
  [ 30, 31, 32, 39, 40, 41, 48, 49, 50 ],
  [ 33, 34, 35, 42, 43, 44, 51, 52, 53 ],
  [ 54, 55, 56, 63, 64, 65, 72, 73, 74 ],
  [ 57, 58, 59, 66, 67, 68, 75, 76, 77 ],
  [ 60, 61, 62, 69, 70, 71, 78, 79, 80 ]
];
let regionCode = [
  [ "A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3" ],
  [ "A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6" ],
  [ "A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9" ],
  [ "D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3" ],
  [ "D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6" ],
  [ "D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9" ],
  [ "G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3" ],
  [ "G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6" ],
  [ "G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9" ]
];
 
class SudokuSolver {
 
  checkIfValueOnPosIsValid(puzzleString, coordinate, value, pos) {
    value = value.toString();
    
    if (pos === undefined) {
      let posXY = this.getPosition(coordinate);
      let posX = posXY[0];
      let posY = posXY[1];
      pos = regions0[posY][posX];
    }
    if (puzzleString[pos] == value) {
      let row = coordinate[0];
      let col = Number(coordinate[1]);
 
      // delete value on position from puzzle to proceed with testing
      let puzzle = puzzleString.split("");
      puzzle[pos] = ".";
      puzzle = puzzle.join("");
 
      if (this.getNewValueValidity(puzzle, row, col, value )) {
        return 1; // = valid
      }
    }
    return 0; // = invalid
  }
 
  getNewValueValidity(puzzle, row, col, value) {
    value = value.toString();
    if (this.checkColPlacement(puzzle, col, value)) {
      return 0;
    }
    if (this.checkRowPlacement(puzzle, row, value)) {
      return 0;
    }
    if (this.checkRegionPlacement(puzzle, row, col, value )) {
      return 0;
    }
    return 1; // = valid
  }
 
  getPosition(coordinate) {
    let posX, posY;
    for (let i = 0; i < 9; i++) {
      if (regionCode[i].includes(coordinate)) {
        posX = regionCode[i].indexOf(coordinate);
        posY = i;
      }
    }
    return [ posX, posY ];
  }

  getCoordinate(position) {
    let posX, posY;
    for (let i = 0; i < 9; i++) {
      if (regions0[i].includes(position)) {
        posX = regions0[i].indexOf(position);
        posY = i;
      }
    }
    let coordinate = regionCode[posY][posX];
    return coordinate;
  }
 
  validate(puzzleString) {
    for (let pos = 0; pos < 81; pos++) {
      if (puzzleString[pos] === ".") { continue; }
 
      let coordinate = this.getCoordinate(pos);
      let value = puzzleString[pos];
      
     if (!this.checkIfValueOnPosIsValid(puzzleString, coordinate, value, pos)) {
        return 0;
      }
    }
    return 1; // = valid
  }
 
  checkRowPlacement(puzzleString, row, value) {
    let rowArr = [];
    let from, to;
    value = value.toString();
    switch(row) {
      case "A": from = 1; to = 9; break;
      case "B": from = 10; to = 18; break;
      case "C": from = 19; to = 27; break;
      case "D": from = 28; to = 36; break;
      case "E": from = 37; to = 45; break;
      case "F": from = 46; to = 54; break;
      case "G": from = 55; to = 63; break;
      case "H": from = 64; to = 72; break;
      case "I": from = 73; to = 81; break;
    }
    for (let i = from; i <= to; i++) {
      rowArr.push(puzzleString[i-1]);
    }
    if (rowArr.includes(value)) {
      return "row";
    }
    return 0;
  }
 
  checkColPlacement(puzzleString, column, value) {
    let colArr = [];
    let displace;
    column = Number(column);
    value = value.toString();
 
    switch(column) {
      case 1: displace = 0; break;
      case 2: displace = 1; break;
      case 3: displace = 2; break;
      case 4: displace = 3; break;
      case 5: displace = 4; break;
      case 6: displace = 5; break;
      case 7: displace = 6; break;
      case 8: displace = 7; break;
      case 9: displace = 8; break;
    }
    for (let i = 1+displace ; i <= 81; i+=9) {
      colArr.push(puzzleString[i-1]);
    }
    if (colArr.includes(value)) {
      return "column";
    }
    return 0;
  }
 
  checkRegionPlacement(puzzleString, row, column, value) {
    let coordinate = row + column;
    value = value.toString();

    let pos = this.getPosition(coordinate);
    let posY = pos[1];

    let region = regions0[posY];
    let regionValues = [];

    for (let i = 0; i < 9; i++) {
      regionValues[i] = puzzleString[region[i]];
    }
   
    if (regionValues.includes(value)) {
      return "region";
    }
    return 0;
  }
 
  solve(puzzleString, pos) {
    if (pos === undefined) {
      pos = 0;
      let inputError = inputErrorHandler.puzzleFormat(puzzleString);
      if (inputError) {
        return inputError;
      }
    };

    let isValid = this.validate(puzzleString);
    let dotCheck = puzzleString.includes(".");
    if (isValid && !dotCheck) {
      return puzzleString;
    }

    while (pos >= 0 && pos < 81) {
      if (puzzleString[pos] !== ".") {
        pos++;
        continue;
      }
 
      let coordinate = this.getCoordinate(pos);
      let row = coordinate[0];
      let col = coordinate[1];
 
      for (let value = 1; value <= 9; value++) {
         if (this.getNewValueValidity(puzzleString, row, col, value)) {
         let newPuzzle = puzzleString.split("");
          newPuzzle[pos] = value;
          newPuzzle = newPuzzle.join("");
          
          let halo = this.solve(newPuzzle, pos+1);
          if (halo) {
            newPuzzle = halo;
            return newPuzzle;
          }
        }
        if (value === 9) {
          return 0;
        }
      }
    }
    return 0;
  }
}
 
module.exports = SudokuSolver;