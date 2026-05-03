# Finds the root of a number with an acceptable error margin and a maximum number of iterations.
def square_root_bisection(value,tolerance=0.01,max_iterations=100):
    if value < 0:
        raise ValueError("Square root of negative number is not defined in real numbers")
        return
    
    if value in [0,1]:
        print(f"The square root of {value} is {value}")
        return value
    
    root = 0
    iteration = 0
    low = 0 if value > 1 else value
    high = value if value > 1 else 1

    while iteration < max_iterations:
        iteration += 1
        root = (low + high) / 2
        
        if root**2 > value:
            high = root
        else:
            low = root

        is_under_tolerance = high - low <= tolerance
        
        if is_under_tolerance:   
            print(f"The square root of {value} is approximately {root}")
            return root
 
    print(f"Failed to converge within {max_iterations} iterations", root)
    return None

# Test
square_root_bisection(2,0.01,10)
square_root_bisection(9,0.01,11)
square_root_bisection(0.001, 1e-7, 50)
square_root_bisection(0.25, 1e-7, 50)
square_root_bisection(225, 1e-3, 100)
square_root_bisection(225, 1e-7, 10)