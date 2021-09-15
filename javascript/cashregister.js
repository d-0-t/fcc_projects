function checkCashRegister(price, cash, cid) {
  let change = 100*(cash-price);
  let cidSum = 0;
  let count = change;
  let give = [];
  let payout;

  for (let i = 0; i < cid.length; i++) {
    cid[i][1] *= 100;
    cidSum += cid[i][1];
  }

  if (cidSum < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  else if (cidSum !== change) {
    function payout(quant,x,moneyType) {
      let amount = 0;
      let nope = 1;
      if (count/quant > 1 && count > 0) {
        while (cid[x][1] > 0 && count >= quant && nope > 0 && count > 0) {
          count -= quant;
          cid[x][1] -= quant;
          amount += quant;
          if (cid[x][1] === 0 || count === 0 || count < quant) {
            nope = 0;
          }
        }
        give.push([moneyType, amount/100]);
      }
    }
    payout(10000,8,"ONE HUNDRED");
    payout(2000,7,"TWENTY");
    payout(1000,6,"TEN");
    payout(500,5,"FIVE");
    payout(100,4,"ONE");
    payout(25,3,"QUARTER");
    payout(10,2,"DIME");
    payout(5,1,"NICKEL");
    payout(1,1,"PENNY");
  }

  let giveSum = 0;
  for (let i = 0; i < give.length; i++) {
    giveSum += give[i][1];
  }
  for (let i = 0; i < cid.length; i++) {
    cid[i][1] /= 100;
  }
  if (cidSum === change) {
    return {status: "CLOSED", change: cid};
  }
  if (giveSum === 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  return {status: "OPEN", change: give };
}

console.log(checkCashRegister(19.5, 20,
                              [["PENNY", 0.5],
                               ["NICKEL", 0],
                               ["DIME", 0],
                               ["QUARTER", 0],
                               ["ONE", 0],
                               ["FIVE", 0],
                               ["TEN", 0],
                               ["TWENTY", 0],
                               ["ONE HUNDRED", 0]]));
