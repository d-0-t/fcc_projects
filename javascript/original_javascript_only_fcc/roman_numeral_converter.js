function convertToRoman(num) {

  num = num.toString().split("");
  num = num.map(x => parseInt(x));
  num = num.reverse();

  let len = num.length;
  let rom = [];

  let assign = [];
  assign = [ 
    function(ones) {
      switch (ones) {
        case 0: rom.push(""); break;
        case 1: rom.push("I"); break;
        case 2: rom.push("II"); break;
        case 3: rom.push("III"); break;
        case 4: rom.push("IV"); break;
        case 5: rom.push("V"); break;
        case 6: rom.push("VI"); break;
        case 7: rom.push("VII"); break;
        case 8: rom.push("VIII"); break;
        case 9: rom.push("IX"); break;
      }
    },
    function(tens) {
      switch (tens) {
        case 0: rom.push(""); break;
        case 1: rom.push("X"); break;
        case 2: rom.push("XX"); break;
        case 3: rom.push("XXX"); break;
        case 4: rom.push("XL"); break;
        case 5: rom.push("L"); break;
        case 6: rom.push("LX"); break;
        case 7: rom.push("LXX"); break;
        case 8: rom.push("LXXX"); break;
        case 9: rom.push("XC"); break;
      }
    },
    function(hundreds) {
      switch (hundreds) {
        case 0: rom.push(""); break;
        case 1: rom.push("C"); break;
        case 2: rom.push("CC"); break;
        case 3: rom.push("CCC"); break;
        case 4: rom.push("CD"); break;
        case 5: rom.push("D"); break;
        case 6: rom.push("DC"); break;
        case 7: rom.push("DCC"); break;
        case 8: rom.push("DCCC"); break;
        case 9: rom.push("CM"); break;
      }
    },
    function(thousands) {
      switch (thousands) {
        case 0: rom.push(""); break;
        case 1: rom.push("M"); break;
        case 2: rom.push("MM"); break;
        case 3: rom.push("MMM"); break;
      }
    }
  ]
  
  for (var i = 0; i < len; i++) {
    assign[i](num[i]);
  }

  rom = rom.reverse();

  return rom.join("");
}

console.log(convertToRoman(3999));
