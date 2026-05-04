# The N-Queens Algorithm
# Place N queens on an N×N chessboard so that no two queens attack each other (no two share a row, column, or diagonal).
def dfs_n_queens(n):
    if n < 1:
        return []
    
    solutions = []

    def is_safe(board,row,col):
        for prev_row in range(row):
            prev_col = board[prev_row]
            # check columns
            if prev_col == col:
                return False
            # check diagonals
            if abs(prev_row - row) == abs(prev_col - col):
                return False
        return True

    def solve(row, current_board, solutions, n):
        # full solution is reached:
        if row == n:
            solutions.append(list(current_board))
            return

        # try every column
        for col in range(n):
            if is_safe(current_board, row, col):
                current_board.append(col) # place the queen
                solve(row + 1, current_board, solutions, n) # go deeper
                current_board.pop() # remove the queen to try the next column

    solve(0,[],solutions,n)

    return solutions

print(dfs_n_queens(5))
# Output: [[0, 2, 4, 1, 3], [0, 3, 1, 4, 2], [1, 3, 0, 2, 4], [1, 4, 2, 0, 3], [2, 0, 3, 1, 4], [2, 4, 1, 3, 0], [3, 0, 2, 4, 1], [3, 1, 4, 2, 0], [4, 1, 3, 0, 2], [4, 2, 0, 3, 1]]