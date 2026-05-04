# Converts an adjacency list representation of a graph into an adjacency matrix.
# Example:
# Adjacency list (input):
# { 0: [1, 2],
#   1: [2],
#   2: [0, 3],
#   3: [2] }
#
# Adjacency matrix (output):
# [ [0, 1, 1, 0],
#   [0, 0, 1, 0],
#   [1, 0, 0, 1],
#   [0, 0, 1, 0] ]
#
def adjacency_list_to_matrix(adj_list):
    length = len(adj_list.keys())
    matrix = [ [0] * length for _ in range(length) ]
    
    for i in range(length):
        for j in adj_list[i]:
            matrix[i][j] = 1
        
        print(matrix[i])        
    
    return matrix

adjacency_list_to_matrix({0: [2], 1: [2, 3], 2: [0, 1, 3], 3: [1, 2]})
adjacency_list_to_matrix({0: [1, 2], 1: [2], 2: [0, 3], 3: [2]})