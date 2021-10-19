# British-American Translator

[[Demo]](https://replit.com/@d-0-t/American-British-Translator) <--- click there for the demo and code on replit :-)

## Description
This app will try its best to translate region-specific words and expression to their counterpart and highlight the new words.

### Example:  
- **From American to British**
  - American input: "Mangoes are my favorite fruit to eat at 4:20."
  - British result: "Mangoes are my ***favourite*** fruit to eat at ***4.20***."
- **From British to American**
  - American input: "Prof Heisenberg usually cooks candy around 4.30."
  - British result: "***Prof.*** Heisenberg usually cooks candy around ***4:30.***"

### .env
Comment out NODE_ENV=test if you don't want the tests to run.

## My work

### Some problems I had to solve
- Separate expressions (two words with space) must be matched before normal words
- Swap conflicting lines in the dictionary
- The titles are a bit tricky to parse
  - They do not behave perfectly (but neither does their sample project, haha!). I could probably improve this if this was to be used somewhere.
- Try to conserve the capitalization (imperfect)
  - Capitalize titles
  - Capitalize first word of sentence
  - If a word is not a translated word, the code will look through the original text's words to find its match and replace it if it exists. Since the translated sections are not indexed, this will result in incorrect capitalization if there are multiple instances of the same word with different capitalization.
- Word boundaries...
  - "ta" in American translates to "thank you". This triggers false translations.
    - paracetamol --> paracethank youmol
  - Solved with RegEx construction with boundaries, with the matched key as its dynamic variable in the middle. This was it only replaces actual words, and not something inside another word.
  - Titles with dots and normal translations are matched with a different RegEx
- Rewrite for compatibility (translator.js)
  - Initially I have written the code with .replaceAll(), but that was not compatible with Replit, so I had to change it to replace, which means there are some minor differences. I had to construct new RegExes to place into the older, more compatible .replace() function.
- Returning array of various output types to match with testing and equality check
  - *formatted* - html formatted translation with highlighting <span>
  - *nonFormatted* - translation without the tags
  - *lowNonFormatted* - lowercase translation without the tags
  - *lowOriginal* - lowercase version of original string
  - *text* - the entirely original string

### My code:
- routes/api.js
- tests/1_unit-tests.js
- tests/2_unit-tests.js
- components/translator.js
- components/translator_replaceAll.js

### FrontEnd modifications
- views/index.html
- public/style.css

### Minor modifications:
- components/american-to-british-titles.js
  - swapped "mr." and "mrs." rows
- components/british-only.js
  - swapped "car boot" and "car boot sale" rows

The rest is freeCodeCamp's boilerplate and testing environment.
