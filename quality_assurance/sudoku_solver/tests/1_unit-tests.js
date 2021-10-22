const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
const InputErrorHandlerScript = require('../controllers/inputerrorhandler.js');
const CheckConflicts = require('../controllers/checkconflicts.js');
let sudoku = new SudokuSolver();
let inputErrorHandler = new InputErrorHandlerScript();

suite('UnitTests', () => {
  suite('Puzzle validity', () => {
    //#1
    test("Logic handles a valid puzzle string of 81 characters", function (done) {
      let input = "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51";
      assert.equal(sudoku.validate(input),true);
      done();
    });
    //#2
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function (done) {
      let input = "invalidIsMyMiddleName8315.749.157.............53..4...96.415..81..7632..3...28.51";
      let response = { error: "Invalid characters in puzzle" };
      assert.deepEqual(inputErrorHandler.puzzleFormat(input),response);
      done();
    });
    //#3
    test("Logic handles a puzzle string that is not 81 characters in length", function (done) {
      let input = "I just had my gluten-free, milk-free mud cake (kladdkaka) and I am happy :)";
      let response = { error: "Expected puzzle to be 81 characters long" };
      assert.deepEqual(inputErrorHandler.puzzleFormat(input),response);
      done();
    });
  });
  suite('Check placements', () => {
    //#4
    test("Logic handles a valid row placement", function (done) {
      let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let value = "7";
      assert.equal(sudoku.checkRowPlacement(puzzle, row, value),false);
      done();
    });
    //#5
    test("Logic handles an invalid row placement", function (done) {
      let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let value = "1";
      assert.equal(sudoku.checkRowPlacement(puzzle, row, value),"row");
      done();
    });
    //#6
    test("Logic handles a valid column placement", function (done) {
      let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let col = "1";
      let value = "7";
      assert.equal(sudoku.checkColPlacement(puzzle, col, value),false);
      done();
    });
    //#7
    test("Logic handles an invalid column placement", function (done) {
      let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let col = "1";
      let value = "1";
      assert.equal(sudoku.checkColPlacement(puzzle, col, value),"column");
      done();
    });
    //#8
    test("Logic handles a valid column placement", function (done) {
      let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let col = "1";
      let value = "7";
      assert.equal(sudoku.checkRegionPlacement(puzzle, row, col, value),false);
      done();
    });
    //#9
    test("Logic handles an invalid column placement", function (done) {
      let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let col = "1";
      let value = "5";
      assert.equal(sudoku.checkRegionPlacement(puzzle, row, col, value),"region");
      done();
    });
  });
  suite('Solve tests', () => {
    //#10
    test("Valid puzzle strings pass the solver", function (done) {
      let puzzle = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
      assert.notEqual(sudoku.solve(puzzle),false);
      done();
    });
    //#11
    test("Invalid puzzle strings fail the solver", function (done) {
      let puzzle = "idk";
      let result = { error: "Expected puzzle to be 81 characters long" };
      assert.deepEqual(sudoku.solve(puzzle),result);
      done();
    });
    //#12
    test("Solver returns the expected solution for an incomplete puzzle", function (done) {
      let puzzle = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
      let solution = "473891265851726394926345817568913472342687951197254638734162589685479123219538746";
      assert.equal(sudoku.solve(puzzle),solution);
      done();
    });
  });
});
