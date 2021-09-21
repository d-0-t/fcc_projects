function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let quotes = [];

function loadAllQuotes() {
  return $.getJSON(
    "https://raw.githubusercontent.com/d-0-t/fcc_projects/main/frontend/random_quote_machine/vampire_orbituary.json",
    function (data) {
      $.each(data, function (index, quoted) {
        quotes.push(quoted);
        console.log(quoted);
      });
      console.log("I loaded all quotes");
    }
  );
}

let r = 0;
let prevR;
function newRandom() {
  prevR = r;
  r = Math.floor(Math.random() * quotes.length);
  if (prevR === r) {
    r += 1;
    if (r > quotes.length) {
      r -= quotes.length;
    }
  }
}

function getNewQuote() {
  console.log("Fetching new quote. Previous was r=" + r);
  newRandom();
  let newQuote = quotes[r];

  $("#author").text(newQuote.author).animate({ opacity: 1 }, 750);
  $("#text").text(newQuote.quote);
  $("#quoteplace").animate({ opacity: 1 }, 2500);

  console.log("Fetched r=" + r);

  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=VampireOrbituary&text=" +
      encodeURIComponent('"' + newQuote.quote + '" ' + newQuote.author)
  );

  sleep(2500).then(() => $("#new-quote").removeAttr("disabled"));
}

$(document).ready(function () {
  loadAllQuotes().done(() => {
    getNewQuote();
  });

  $("#new-quote").on("click", function () {
    $("#author").animate({ opacity: 0 }, 1000);
    $("#quoteplace").animate({ opacity: 0 }, 1000);
    $(this).attr("disabled", "disabled");
    sleep(1000).then(() => {
      getNewQuote();
    });
  });
});
