def quick_sort(array: [int]):
    if not array:
        return []

    pivot = array[0]

    less = [x for x in array if x < pivot]
    equal = [x for x in array if x == pivot]
    more = [x for x in array if x > pivot]

    less = quick_sort(less)
    more = quick_sort(more)

    sorted_array = less + equal + more

    return sorted_array

print(quick_sort([20, 3, 14, 1, 5]))