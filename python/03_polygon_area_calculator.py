import math

class Rectangle:
    def __init__(self, width:int, height:int):
        self._width = width
        self._height = height
        pass
    
    def __repr__(self):
        return f"Rectangle(width={self.width}, height={self.height})"
    
    @property
    def width(self):
        return self._width
    @width.setter
    def width(self, new_width):
        self._width = new_width
    def set_width(self, new_width):
        self.width = new_width

    @property
    def height(self):
        return self._height
    @height.setter
    def height(self, new_height:int):
        self._height = new_height
    def set_height(self, new_height:int):
        self.height = new_height

    def get_area(self):
        return self.width * self.height
    
    def get_perimeter(self):
        return 2 * (self.width + self.height)
    
    def get_diagonal(self):
        return math.sqrt(self.width**2 + self.height**2)

    # Returns a string that represents the shape using lines of * if both sides are smaller than 50.
    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return("Too big for picture.")
        
        pic = ""
        for h in range(self.height):
            for w in range(self.width):
                pic += "*"
            pic += "\n"
        return pic
        # alternatively:
        # return (("*" * self.width) + "\n") * self.height
    
    # return how many times another shape fits into the instance of this one
    def get_amount_inside(self,shape):
        return math.floor(self.width / shape.width) * math.floor(self.height / shape.height)

class Square(Rectangle):
    def __init__(self, side_length:int):
        super().__init__(side_length, side_length)

    def __repr__(self):
        return f"Square(side={self.width})"

    def set_side(self,new_side_length:int):
        self.width = new_side_length
        self.height = new_side_length
    def set_height(self,new_side_length:int):
        self.set_side(new_side_length)
    def set_width(self,new_side_length:int):
        self.set_side(new_side_length)


rect = Rectangle(10, 5)
print(rect.get_area())
print(rect)
rect.set_height(3)
print(rect.get_perimeter())
print(rect)
print(rect.get_picture())

sq = Square(9)
print(sq.get_area())
sq.set_side(4)
print(sq.get_diagonal())
print(sq)
print(sq.get_picture())

rect.set_height(8)
rect.set_width(16)
print(rect.get_amount_inside(sq))
