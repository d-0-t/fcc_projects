function palindrome(str) {
  
  let reverse = [];

  str = str.toLowerCase().match(/[a-z0-9]/g);

  for (let i = 0; i < str.length; i++) {
    reverse.unshift(str[i]);
  }

  str = str.join("");
  reverse = reverse.join("");

  if (str === reverse) {
    return true;
  }

  else {
    return false;
  }
}

console.log(palindrome("eyeeye"));
