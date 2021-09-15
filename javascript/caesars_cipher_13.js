function rot13(str) {
  str = str.split("");
  let decoded = [];

  for (let i = 0; i < str.length; i++) {
    if (/^[^A-Z]/ig.test(str[i])) {
      decoded.push(str[i]);
    }
    if (/[A-Z]/ig.test(str[i])) {
      let asci = str[i].charCodeAt(0);
      if (asci <= 77) {
        asci = String.fromCharCode(asci+13);
      }
      if (asci > 77) {
        asci = String.fromCharCode(asci-26+13)
      }
      decoded.push(asci);
    } 
  }
  return decoded.join("");
}

console.log(rot13("!SERR PBQR PNZC"));
