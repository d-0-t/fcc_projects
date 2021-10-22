let puzzleRegex = /^[1-9\.]+$/;
let coordinateRegex = /^[A-I][1-9]$/;
let valueRegex = /^[1-9]$/;
let response = {};

function InputErrorHandler(puzzle, coordinate, value) {

  this.puzzleFormat = function(puzzle) {
    if (puzzle === undefined || puzzle === ""){
      response = { error: "Required field missing" };
      return response;
    }
    if (puzzle.length !== 81) {
      response = { error: "Expected puzzle to be 81 characters long"};
      return response;
    }
    if (!puzzle.match(puzzleRegex)) {
      response = { error: "Invalid characters in puzzle" };
      return response;
    }
    return 0;
  }

  this.checkFormat = function(puzzle, coordinate, value, res) {
    if (puzzle === undefined      || puzzle === ""     ||
        coordinate === undefined  || coordinate === "" ||
        value === undefined       || value === ""      ){

      response = { error: "Required field(s) missing" };
      return response;
    }
    coordinate = coordinate.toUpperCase();
    if (!coordinate.match(coordinateRegex)) {
      response = { error: "Invalid coordinate" };
      return response;
    }
    if (!value.match(valueRegex)) {
      response = { error: "Invalid value" };
      return response;
    }
    let response = this.puzzleFormat(puzzle);
    if (response) { return response };

    return 0;
  }
}

module.exports = InputErrorHandler;