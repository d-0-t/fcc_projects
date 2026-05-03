# Exchange sort swaps every time it finds a smaller number while it's still looking.
def exchange_sort(array:[int]):
    for i in range(len(array)):
        for j in range(i + 1, len(array)):
            if array[i] > array[j]:
                array[i], array[j] = array[j], array[i]

    return array

print(exchange_sort([33, 1, 89, 2, 67, 245]))
print(exchange_sort([5, 16, 99, 12, 567, 23, 15, 72, 3]))
print(exchange_sort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))