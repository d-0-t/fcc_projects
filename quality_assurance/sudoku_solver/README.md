# Sudoku Solver
[[Demo]](https://replit.com/@d-0-t/Sudoku-Solver) [[GitHub]](https://github.com/d-0-t/fcc_projects/tree/main/quality_assurance/sudoku_solver)

This app will solve a valid sudoku string. The empty cells are represented by dots.

## Usage
### Solve
Input a (preferably valid) string and click "Solve". The puzzle string submits to `/api/solve`. If it is valid, the solution is returned, and the puzzle board is filled with the solution.

If the string was invalid, it will return an error, such as:
- Required field missing
- Invalid characters in puzzle
- Expected puzzle to be 81 characters long
- Puzzle cannot be solved (invalid board / unsolvable)

#### Input
- 81 characters long
- only numbers 1-9
- dots as empty cells

### Check
The input submitting to `api/check` is the puzzle string, a field with the cell coordinate and the value you wish to inspect. You click the "Check Placement" button.  
It only check the validity for the given puzzle string, and not for the board's solution, so multiple values could return as valid. Hence, they do not represent the real solution.

If the input is invalid, the following errors will be returned:
- Expected puzzle to be 81 characters long
- Invalid characters in puzzle
- Required field(s) missing
- Invalid coordinate
- Invalid value

#### Input
- Puzzle: read above
- Coordinate: row (A-I) + column (1-9)  [A1, B8, F9, G5...]
- Value: numbers from 1 to 9

#### Response

The returned response will depend on the validity if your value at a given coordinate.

If your value can seemingly go to your chosen coordinate, it will return the JSON `{ valid: true }`.

If your value has conflicts, the validity will be false, and the conflicts will be listed as an array, for example if it conflicts all three area-types, the following object will appear:

`{ "valid": false, "conflict": [ "row", "column", "region" ] }`

#### One specific check
If you check a value that is already in the puzzle string at the given coordinate, it will delete the value from the puzzle string, and pass the same value to the validity checking function along with the puzzle and the coordinates - getNewValueValidity().

## Algorithm

The program is written with the **brute force / backtracking** method and uses a recursive solve() loop as well as a while loop inside. The latter iterates from 0 to 80 and serves as the position in the string, because I did not parse the string to be handled as rows/columns in the solve() algorithm.

### Solve
1. A function to check if the position has been previously defined. If not, the position is set to 0. In addition, it also needs another inputError check, due to the tests (if the puzzle string is invalid, it will just return the corresponding error).
2. This one is for future reference: we need to check if the puzzle string is valid before we do anything else, and if it still includes empty cells (dots). If it is valid, and has no empty cells left, that means we have a solution, and we have to return it. This is quite important and will make it possible to return the final solution.
3. If this check fails (puzzle is not solved yet), the real function will begin - the while loop starts (and/or continues) at the given position.
4. We check if there's already a number on the position we are working with. If there is, we are going to skip the loop with `continue;` after increasing the position by one, allowing our while loop to step forward towards the solution.
5. If our value was an empty cell, we will need to get the coordinates and the corresponding rows and columns with another function. That function will compare region-based (the 3x3 square) arrays, one array with the positions, and the other with the corresponding coordinates at the same index.
6. We are now good to start checking the values from 1 to 9 and see which one is good.
7. We check if the given the new value, the puzzle board still remains valid. If not, nothing will happen, and the for loop will move on to its next cycle. If it reaches the 9th cycle and it still has not found a valid solution, the entire solve() function ends as the failure is resolved with an elegant `return 0;`. But don't fret, because if the puzzle board is valid...
8. We insert our value into our puzzle string at the current position.
9. We launch a new solve() loop with the new puzzle string and the increased position.
10. If it does not return 0, that means things are cool, and that the CORRECT puzzle string can now be safely returned - at the end of the line, at the last position, the check mentioned at (2.) will be passed back, back, back, back ... all returned into the initial solve(). But only if there is a solution. If not...
11. The for loop cycles, or ends, and if it is the last (9th) cycle, the whole solve() dies, making it possible for a previous for cycle to thrive with a different, now correct inserted value.
12. If all else fails, return 0 at the end of solve(), just in case. You never know.

### Validity checks
1. Check if column, row or region has any conflicts
2. In col/row checks a switch() function assigns the positions to the area, in region checks it is done with pre-written arrays.
3. If row/col/reg has no conflicts, it returns 0. If they do, they return their identifying string (the same one that gives the "conflict" JSON key its array of strings in /api/check).


### Testing
- 12 unit checks for testing the function behaviors, error handling, results, solutions
  - Mostly just `assert.equal()` and `assert.deepEqual()`
- 14 functional tests for the same reason, but through POST requests to `/api/check` and `/api/solve`

## Problems I had to solve
I would say setting up everything else other than the solve() function was quite easy for me, but I had some issues that I had to work out.

### typeof

Sometimes the type of the values did not match and ended up giving false-positive or false-negative results, messing up the whole thing. But an easy fix to that is to just make sure to format your values to the correct type, the one you want to work with. Number/string annoyances can be quite common.

### solve()

I actually love algorithms. I would not say the solve() algorithm itself was especially challenging to write (maybe its debugging...). I don't have enough experiences with recursive functions but it still did not feel like an impossible task. But that does not mean I did not make mistakes, haha. No.

The first try, I wrote an algorithm. It seemed to... kind of... work? But it was failing. The solutions which were filled in seemed correct, but nothing I tried would truly fix it early stop, and I could not find the problem. There were also some issues with `typeof` discrepancies in the helper functions which I had to fix before patching up solve() itself.

After that, I did a little reading about how to write a sudoku solver, and turns out, I did it correctly, but position-based, and not region based, which is fine.

So I deleted the whole solve() function code and decided to write it again from scratch, hoping I would make a different mistake, if any. But boy, was I wrong. I made the same mistake as the first time. The failure had the exact same symptoms at the exact same position. Eerie, right?

What can one do? Just console.log the cr*p out of it, I suppose. The problem had to be minor, because the solutions were looking great. EXCEPT... The default puzzle string supplied with the project was a bit elusive and tricky. It took a lot of filling of fields until a cell came up which would have required backtracking... which failed. So, it was evident, that the mistake was just one wrongly placed `return 0;`. There were too many brackets. So many. So, in confusion, and nightly exhaustion, I returned at the wrong line.

Oh well. Deleted said line and it "instantly" solved my sudoku. :-)

Fiddled a bit with returning the winning solution correctly, then I was done.

I would not say it was hard, but it was a darn good challenge and a fun experience.

## Possible future improvements (speed)
Although the brute force option is very much viable, one could still make the algorithm go faster if they begin with some extra logic before (if at all) forcing it brutally. Ideas:
- Limit the range of values the for loop
  - How many and which values can actually go into the empty cell?
  - In a given area (row/col/reg), which values are missing?
- Make the beginning of solve() faster:
  - If only one value can go into a specific cell in a given area, fill it.
  - If the area has only one value missing, fill it.
- Ditch the freeCodeCamp criterias and rewrite the whole program with a different set of, simpler, faster functions.

## My code, my files...
- controllers/checkconflicts.js
- controllers/inputerrorhandler.js
- controllers/sudoku-solver.js
- routes/api.js
- tests/1_unit-tests.js
- tests/2_functional-tests.js
- public/style.css (big style change)
- views/index.html (some structural modifications)

The rest of the files were supplied by freeCodeCamp's boilerplate for the project.
