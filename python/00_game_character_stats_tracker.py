class GameCharacter:
    def __init__(self,name):
        self._name = name
        self._health = 100
        self._mana = 50
        self._level = 1
    
    @property
    def name(self):
        return self._name

    @property
    def level(self):
        return self._level
    
    @property
    def health(self):
        return self._health   
    @health.setter
    def health(self, new_health):
		# health is min 0, max 100, or inbetween
        self._health = max(0, min(new_health, 100))
    
    @property
    def mana(self):
        return self._mana
    @mana.setter
    def mana(self, new_mana):
		# mana is min 0, max 50, or inbetween
        self._mana = max(0, min(new_mana, 50))
    
    def __str__(self):
        return f"Name: {self.name}\nLevel: {self.level}\nHealth: {self.health}\nMana: {self.mana}"

    def level_up(self):
        self._level = self._level + 1
        self.health = 100
        self.mana = 50
        print(f"{self.name} leveled up to {self.level}!")
    
    
# hero = GameCharacter('Kratos') # Creates a new character named Kratos
# print(hero)  # Displays the character's stats

# hero.health -= 30  # Decreases health by 30
# hero.mana -= 10    # Decreases mana by 10
# print(hero)  # Displays the updated stats

# hero.level_up()  # Levels up the character
# print(hero)  # Displays the stats after leveling up