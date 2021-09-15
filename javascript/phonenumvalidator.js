function telephoneCheck(str) {
  let regex = [
    /^[0-9]{3}[-][0-9]{3}[-][0-9]{4}/,
    /^[1][ ][0-9]{3}[-][0-9]{3}[-][0-9]{4}/,
    /^[(][0-9]{3}[)][0-9]{3}[-][0-9]{4}/,
    /^[1][(][0-9]{3}[)][0-9]{3}[-][0-9]{4}/,
    /^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}/,
    /^[1][ ][(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}/,
    /[0-9]{3}[ ][0-9]{3}[ ][0-9]{4}/,
    /[0-9][ ][0-9]{3}[ ][0-9]{3}[ ][0-9]{4}/,
    /^[0-9]{10}/
  ]
  let numCount = 0;

  for (let i = 0; i < str.length; i++) {
    if (!/[\ 0-9()-]+/g.test(str[i])) {
       return false;
     }
  }
  for (let i = 0; i < str.length; i++) {
    if (/[0-9]/g.test(str[i])) {
      numCount++;
     }
    }
  if (numCount !== 10 && str[0] !== "1" || numCount > 11) {
    return false;
  }
  
  if (numCount === 11 && str[0] === "1") {
     for (let i = 0; i < regex.length; i++) {
       if (regex[i].test(str)) {
         return true;
       }
     }
     return false;
  }
  if (numCount === 10 && str[0] !== "1") {
     for (let i = 0; i < regex.length; i++) {
       if (regex[i].test(str)) {
         return true;
       }
     }
     return false;
  }
}
console.log(telephoneCheck("1 555)555-5555"));
