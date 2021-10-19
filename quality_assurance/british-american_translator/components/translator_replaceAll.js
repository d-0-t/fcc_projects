const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

function invert(dict) {
  var reversedDictionary = {};
  for(var key in dict){
    reversedDictionary[dict[key]] = key;
  }
  return reversedDictionary;
}
function capitalFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


let titles = americanToBritishTitles;
let britishToAmericanSpelling = invert(americanToBritishSpelling);
let americanTime = /[0]?([1-9]|[1][012])[:][0-5][\d]/g;
let britishTime = /[0]?([1-9]|[1][012])[.][0-5][\d]/g;

function translate(text, dictionary, titles, timeFormat, locale) {
  let string = text.toLowerCase();

  let matched = {};

  // Mapping times
  let timeStrings = string.match(timeFormat);
  if (timeStrings) {
    timeStrings.map((elem) => {
      if (locale === "toBritish") {
        return (matched[elem] = elem.replace(":","."));
      }
      return (matched[elem] = elem.replace(".",":"));
    });
  }

  // Mapping ALL titles and turning them into first letter uppercase
  Object.entries(titles).map(([key, value]) => {
    let keyMatch, valMatch;
    keyMatch = capitalFirst(key);
    valMatch = capitalFirst(value);
    
    if (string.includes(key)) {
      if (locale === "toBritish") {
        matched[key] = keyMatch.slice(0,-1);
      } else { matched[key] = keyMatch; }
    }
    if (string.includes(value)) {
      if (locale === "toBritish") {
        matched[key] = valMatch;
      } else { matched[value] = keyMatch; }
    }
  }) 
  
  // Mapping expressions with spaces into a new object
  let expressions = {};
  Object.entries(dictionary).map(([key, value]) => {
    if (key.includes(" ")) {
      expressions[key] = value;
    }
  });
  // Mapping regular dictionary words
  let wordsInDic = {};
  Object.entries(dictionary).map(([key, value]) => {
    if (!key.includes(" ")) {
      wordsInDic[key] = value;
    }
  });

  // Matching the expressions with spaces first, then normal words
  Object.entries(expressions).map(([key, value]) => {
    if (string.includes(key)) {
      matched[key] = value;
    }
  });
  Object.entries(wordsInDic).map(([key, value]) => {
    if (string.includes(key)) {
      matched[key] = value;
    }
  });

  // Inserting the translation 
  let translatedString = string;
  let nonFormattedTranslation = string;
  Object.entries(matched).map(([key, value]) => {
    let wordBoundKey = new RegExp("\\b" + key + "\\b", "g");
    let isTitleRegex = /^[\w]+\.$/;
    
    if (string.includes(key)) {
      if(key.match(isTitleRegex)) {
        translatedString = translatedString
        .split(key)
        .join('<span class="highlight">' + value + '</span>');
        return 0;
      }
      if(string.match(wordBoundKey)) {
        translatedString = translatedString
        .split(key)
        .join('<span class="highlight">' + value + '</span>');
        return 0;
      }
    }  
  });

  // Capitalize first letter of a new sentence (after .?! + whitespace)
  let capReg = /[.?!][\s\r\n]+[a-z]/g;
  let notCapped = text.match(capReg);
  if (notCapped) {
    for (let i = 0; i < notCapped.length; i++) {
      translatedString = translatedString
      .replaceAll(notCapped[i],notCapped[i].toUpperCase());
    }
  }
  // Now let's try to conserve SOME upper cases with additional magic.
  let splitText = text.split(" ");
  let lowerText = text.toLowerCase().split(" "); 
  let splitTransText = translatedString.split(" ");

  for (let i = 0; i < splitTransText.length; i++) {
    let getIndex;
    if (lowerText.includes(splitTransText[i])) {
      for (let j = 0; j < lowerText.length; j++) {
        if (lowerText[j] === splitTransText[i]) {
          getIndex = j;
        }
      }
      splitTransText[i] = splitText[getIndex];
    }
  }
  translatedString = splitTransText.join(" ");
  
  nonFormattedTranslation = translatedString.replaceAll('<span class="highlight">','').replaceAll('</span>','');

  // Capitalize first letter of string if it used to be capitalized
  if ( text[0] === text[0].toUpperCase() ) {
    translatedString = translatedString[0].toUpperCase() + translatedString.slice(1);
    nonFormattedTranslation = nonFormattedTranslation[0].toUpperCase() + nonFormattedTranslation.slice(1);
  }

  return {
    formatted: translatedString.replace('\n', '<br/>'),
    nonFormatted: nonFormattedTranslation,
    lowNonFormatted: nonFormattedTranslation.toLowerCase(),
    lowOriginal: text.toLowerCase(),
    original: text
  };
}

/////////////////////////////////////////////////////////////////////////// :)

class Translator {
  toBritish(text) {
    let dictionary = { ...americanOnly, ...americanToBritishSpelling };
    let time = americanTime;
    let locale = "toBritish";

    let translated = translate(text, dictionary, titles, time, locale);
    
    if (translated.lowNonFormatted === translated.lowOriginal) {
      return text;
    };
    return translated;
  }
  toAmerican(text) {
    let dictionary = { ...britishOnly, ...britishToAmericanSpelling };
    let time = britishTime;
    let locale = "toAmerican";
    
    let translated = translate(text, dictionary, titles, time, locale);

    if (!translated) { return text };
    return translated; 
  }
}

module.exports = Translator;