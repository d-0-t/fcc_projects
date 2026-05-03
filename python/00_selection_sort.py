# Selection sort only swaps once per outer loop by selecting the smallest index first, then waiting until the end of the inner loop to perform the swap.
def selection_sort(array:[int]):
    for i in range(len(array)):
        min_index = i
        for j in range(i + 1, len(array)):
            if array[j] < array[min_index]:
                min_index = j
        
        if min_index != i:
            array[i], array[min_index] = array[min_index], array[i]

    return array

print(selection_sort([33, 1, 89, 2, 67, 245]))
print(selection_sort([5, 16, 99, 12, 567, 23, 15, 72, 3]))
print(selection_sort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))