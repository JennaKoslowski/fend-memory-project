/*
 * Create a list that holds all of your cards
 */
let cardImg = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"
];

let openCard = [];

/* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 let event = function(event) {
    if (event.target.className === "card" && openCard.length < 2) {
      $(this).toggleClass("open show");
      openCard.push(this);
      console.log(openCard); //add card to array
      if (openCard.length === 2) {
        setTimeout(match, 1000);
      }
    }
  };

let cardCat = document.querySelectorAll(".card");
for (var card of cardCat) {
  card.addEventListener('click',event)
}

function match() {
  let cardA = openCard[0].firstElementChild.className;
  let cardB = openCard[1].firstElementChild.className;
  console.log(cardA + cardB);
  if (cardA === cardB) {
    $(openCard[0]).toggleClass("match");
    $(openCard[1]).toggleClass("match");
    openCard = []//stops flipping regardless of if they match
  } else {
    $(openCard[0]).removeClass("open show");
    $(openCard[1]).removeClass("open show");
    openCard = [];
  }
}
function moves() {
  movesCount++;
  document.querySelector(".moves").innerHTML = movesCount;
}
function starCount() {
  for (var star of stars) {
    if (movesCount === 10 || movesCount === 20 || moves === 30) {
      if (star.style.display !== "none") {
        star.style.display = "none";  
        break;
      }
    }
  }
}