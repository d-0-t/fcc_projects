function partialSym(...args) {
  let i = 0;
  let elems = [];
  let filteringArray = [];
  while (i < args.length) {
    let j = 0;
    // so duplicates in one array are not an issue
    let elemsInOneArr = [];

    while (j < args[i].length) {
      if (elemsInOneArr.includes(args[i][j])) {
        j++;
        // skip a loop since it was already checked
        continue;
      }
      // if the element already exists in the pool, add it to filter
      if (elems.includes(args[i][j])) {
        filteringArray.push(args[i][j])
      }
      // when done, add element to elems pool AND the array's own elems pool
      elems.push(args[i][j]);
      elemsInOneArr.push(args[i][j]);
      j++;
    }
    i++;
  }
  // remove elements that are not unique
  let final = elems.filter(x => {
      return !filteringArray.includes(x);
  })
  return final;
}



// partialSym will always take the first 2 subarrays,
// and return their symmetry,
// then we get rid of the first 2 subarrays
// and place the new symmetry to the first position
function sym(...args) {
  while (args.length > 1) {
    let newValues = partialSym(args[0], args[1]);
      args.shift();
      args.shift();
      args.unshift(newValues);
    }
    let results = args[0];
    return results;
}

sym([1, 2, 5], [2, 3, 5], [3, 4, 5]);
