# Depth-First Search Algorithm
# Outputs a list of all nodes reachable from the node passed to it.
def dfs(matrix,start_node:int):
    reached_nodes = []
    stack = [start_node]

    while stack:
        current = stack.pop()
        
        if current not in reached_nodes:
            reached_nodes.append(current)
            
            for node, is_connected in enumerate(matrix[current]):
                if is_connected == 1 and node not in reached_nodes:
                    stack.append(node)

    return reached_nodes


print(dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 1))