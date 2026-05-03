# Luhn Algorithm (mod 10)
def verify_card_number(value:str):
    value=value.replace("-","").replace(" ","")
    
    if not value.isnumeric():
        return "INVALID!"

    # Split the values into an array and reverse it to work "from the right."
    chars = list(value[::-1])
    double_every_other = []
    
    for i, char in enumerate(chars):
        if i % 2:
            double_every_other.append(str(int(char)*2))
        else:
            double_every_other.append(char)

    final_sum = 0
    for num in double_every_other:
        num_sum = sum(int(x) for x in list(num))
        final_sum += num_sum

    return "VALID!" if final_sum % 10 == 0 else "INVALID!"

print(verify_card_number('413918871'))
print(verify_card_number('453 914 889'))
print(verify_card_number('4539 148-81'))
print(verify_card_number('4df1'))
print(verify_card_number('4111-1111-1111-1111'))