'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const InputErrorHandlerScript = require('../controllers/inputerrorhandler.js');
const CheckConflicts = require('../controllers/checkconflicts.js');
let inputErrorHandler = new InputErrorHandlerScript();
let sudoku = new SudokuSolver();

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      
      let inputError = inputErrorHandler.checkFormat(puzzle, coordinate, value);
      if (inputError) {
        res.json(inputError);
        return 0;
      }

      let result = CheckConflicts(puzzle, coordinate, value);

      res.json(result);
    });


  app.route('/api/solve')
    .post((req, res) => {
      let { puzzle } = req.body;

      let inputError = inputErrorHandler.puzzleFormat(puzzle);
      if (inputError) {
        res.json(inputError);
        return 0;
      }
      
      if (!sudoku.validate(puzzle)) {
        res.json({ error: 'Puzzle cannot be solved' });
        return 0;
      }

      let solution = sudoku.solve(puzzle);

      if (!solution) {
        res.json({ error: 'Puzzle cannot be solved' });
        return 0;
      }
      res.json({ solution: solution });
    });
};
