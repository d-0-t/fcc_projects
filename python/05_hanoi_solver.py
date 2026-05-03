# Solves the Tower of Hanoi with a given number of discs
def hanoi_solver(n:int):
    discs = list(range(n,0,-1))
    rod1 = discs
    rod2 = []
    rod3 = []
    
    state = f"{rod1} {rod2} {rod3}\n"

    def move(n, source, target, auxiliary):
        nonlocal state
        if n > 0:
            # Move n-1 disks from source to auxiliary
            move(n - 1, source, auxiliary, target)
            # Move the disk and record the state
            target.append(source.pop())
            state += f"{rod1} {rod2} {rod3}\n"
            # Move the n-1 disks from auxiliary to target
            move(n - 1, auxiliary, target, source)

    move(n, rod1, rod3, rod2)

    return state.strip()

print(hanoi_solver(2), "\n")
print(hanoi_solver(3), "\n")
print(hanoi_solver(4), "\n")
print(hanoi_solver(5), "\n")