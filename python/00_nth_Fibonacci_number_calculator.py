# Returns the nth Fibonacci number
def fibonacci(n:int):
    if n < 0:
        raise ValueError("Input must be a positive integer.")
        return

    if n == 0 or n == 1:
        return n

    # Solution that only stores 2 values (more efficient) 
    # previous = 0
    # current = 1
    # for _ in range(3, n+2):
    #     new = current + previous
    #     previous = current
    #     current = new

    # Solution that stores the whole sequence (as per instructions)
    sequence = [0,1]
    for i in range(2, n+1):
        new = sequence[i-1] + sequence[i-2]
        sequence.append(new)
    
    return sequence[-1]


# print(fibonacci(-1))
print(fibonacci(0))
print(fibonacci(1))
print(fibonacci(2))
print(fibonacci(3))
print(fibonacci(5))
print(fibonacci(10))
print(fibonacci(15))