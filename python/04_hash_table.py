class HashTable:
    def __init__(self):
        self.collection={}

    def hash(self,string):
        sum = 0
        for char in string:
            sum+=ord(char)
        return sum
    
    def add(self, key, val):
        key_hash = self.hash(key)
        if key_hash not in self.collection:
            self.collection[key_hash] = {}
        self.collection[key_hash][key] = val
         
    def remove(self, key):
        key_hash = self.hash(key)
        if key_hash not in self.collection or key not in self.collection[key_hash]:
            return
        del self.collection[key_hash][key]

    def lookup(self, key):
        key_hash = self.hash(key)
        if key_hash in self.collection:
            return self.collection[key_hash].get(key)