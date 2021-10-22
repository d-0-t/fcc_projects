const SudokuSolver = require('../controllers/sudoku-solver.js');
let sudoku = new SudokuSolver();

function CheckConflicts(puzzle, coordinate, value) {

  let validity = true;
  let confliction = [];
  let result = { valid: validity };

  let presence = sudoku.checkIfValueOnPosIsValid(puzzle, coordinate, value);
  if (presence) {
    return result;
  }

  let row = coordinate[0];
  let col = Number(coordinate[1]);
  
  let conflictRow =
  sudoku.checkRowPlacement(puzzle, row, value);
  if (conflictRow) {
    confliction.push(conflictRow);
  }
  let conflictCol =
  sudoku.checkColPlacement(puzzle, col, value);
  if (conflictCol) {
    confliction.push(conflictCol);
  }
  let conflictReg = 
  sudoku.checkRegionPlacement(puzzle, row, col, value);
  if (conflictReg) {
    confliction.push(conflictReg);
  }

  if (confliction.length) {
    result["conflict"] = confliction;
    result["valid"] = false;
  }
  return result;
}

module.exports = CheckConflicts;