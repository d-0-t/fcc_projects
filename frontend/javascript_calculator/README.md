# JavaScript Calculator

[[Demo]](https://codepen.io/d-o-t/full/OJgagZj)

This project was a little bit tricky and involved quite a lot of debugging, but I think I managed to fix every issue I wanted, and prevented every crash I encountered. I used a lot of regular expressions for that. Big thank you to my friends who kept crashing it so I could fix it. :)))

- Upon pressing the buttons, the display field is automatically updated.
- Multiple operator placement is disabled, except when an operator is followed by a minus sign.
- Three pressed operators will default to the last one.
- Clicking minus multiple times will keep updating the operator (-- --> +, +- --> -)
- AC clears the display
- = evaluates with the risky eval() function
- Decimal abuse is also prevented
- Inputting .5 (or other number) defaults to 0.5 and so
- Excess operators and decimals are removed before evaluation
