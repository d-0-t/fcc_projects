import math as m

class Category:
    def __init__(self,name):
        self.name = name
        self.ledger = []
        self.balance = self.get_balance()

    # Shows the category name, list of ledgers with description and amount, and the total.
    # 30 char with category name centered between *s
    # List of ledgers, 23-char description, left-aligned, the amount right-aligned (two decimal places, max 7 char).
    # Show a final line Total: [balance], where [balance] should be replaced by the category total. 
    def __str__(self):
        title = f"{self.name.center(30, '*')}\n"
        total = f"Total: {self.get_balance()}"
        ledger = ""
        for item in self.ledger:
            # Truncate description to first 23 chars
            description = item['description'][:23]
            # Format amount to 2 decimals
            amount = f"{item['amount']:.2f}"
            line = f"{description:<23}{amount:>7}"
            ledger += line + '\n'
        return title + ledger + total
    
	# Deposits a positive amount in the ledger with or without a description.
    def deposit(self,amount,description=""):
        self.ledger.append({'amount':amount,'description':description})
    
    # Stores the amount (spending) as a negative number in the ledger.
    # Returns True if the withdrawal succeeded, otherwise False.
    def withdraw(self,amount,description=""):
        if not self.check_funds(amount):
            return False
        self.ledger.append({'amount':-amount,'description':description})
        return True

    # Current category total
    def get_balance(self):
        balance = 0
        for item in self.ledger:
            balance += item['amount']
        return balance
    
    # Withdraws the amount with description Transfer to [Destination]
    # Deposits it into the other category with description Transfer from [Source], 
    # Returns True when the transfer is successful, and False otherwise.
    def transfer(self,amount,target):
        if not self.check_funds(amount):
            return False
        self.withdraw(amount,"Transfer to " + target.name)
        target.deposit(amount,"Transfer from " + self.name  )
        return True
    
    # Returns False if it exceeds the balance or True otherwise.
    def check_funds(self,amount):
        balance = self.get_balance()
        return (True if amount <= balance else False)
 

# Creates a chart of the spending by category.
def create_spend_chart(categories):
    chart = "Percentage spent by category\n"
    total = 0
    per_cat = []

	# Calculate the totals
    for cat in categories:
        cat_total = 0
        for item in cat.ledger:
            if item['amount'] < 0:
                cat_total += -item['amount']
        per_cat.append({'name':cat.name,'total':cat_total})
        total += cat_total

	# Add the percentages (of total) to each category
    for cat in per_cat:
        cat['percentage'] = m.floor(cat['total'] / total * 100)   

	# Construct the chart in 10% increments
    for x in range(100,-1,-10):
        line = f"{str(x):>3}" + "| "
        for cat in per_cat:
            p = cat["percentage"]
            line += "o  " if p >= x else "   "
        chart += line + "\n"

    separator = "    "
    for cat in per_cat:
        separator += "---"
    chart += separator + "-\n"

	# Construct the vertical legends
    legend_lines = []
    max_length = max(len(cat.name) for cat in categories)
    for i in range(max_length):
        line = "     "
        for cat in per_cat:
            line += cat['name'][i] + "  " if i < len(cat['name']) else "   "
        legend_lines.append(line)
    
    chart += "\n".join(legend_lines)

    return chart

# food = Category('Food')
# food.deposit(1000, 'initial deposit')
# food.withdraw(10.15, 'groceries')
# food.withdraw(15.89, 'restaurant and more food for dessert')
# clothing = Category('Clothing')
# clothing.deposit(100, 'initial deposit')
# clothing.withdraw(9, 'stockings')
# food.transfer(50, clothing)
# print(food)
# print(create_spend_chart([food,clothing]))