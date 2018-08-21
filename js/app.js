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
let matchedCards = [];
let cardCat = document.querySelectorAll(".card");
let deck = document.querySelector(".deck");
let stars = document.querySelectorAll(".fa-star");
let movesCount = 0;
var restart = document.querySelector(".restart");
let seconds = 0;
let minutes = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleCards() {
  let deckChild = Array.from(document.querySelectorAll(".deck li"));
  let shuffledCards = shuffle(deckChild);
  for (var cardType of shuffledCards) {
    deck.appendChild(cardType);
  }
}
shuffleCards();

let event = function(event) {
  if (event.target.className === "card" && openCard.length < 2) {
    $(this).toggleClass("open show");
    openCard.push(this); //add card to array
    if (openCard.length === 2) {
      setTimeout(match, 1000);
      moves();
      starCount();
      setTimeout(timeCount, 1000);
    }
  }
};

for (var card of cardCat) {
  //for loop/event function inspired by Matt's tutorial
  card.addEventListener("click", event);
}

function match() {
  //check if selected cards match
  let cardA = openCard[0].firstElementChild.className;
  let cardB = openCard[1].firstElementChild.className;
  if (cardA === cardB) {
    $(openCard[0]).toggleClass("match");
    $(openCard[1]).toggleClass("match");
    matchedCards.push(cardA);
    matchedCards.push(cardB);
    console.log(matchedCards);
    openCard = [];
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
    else if (star.style.display = "none") {
      star.style.display = "inline-block";
    }
  }
}
setInterval(timeCount, 500);

function timeCount() {
  seconds++;
  if (seconds <10) {
    document.querySelector(".stopwatch").innerHTML = minutes + " : 0" + seconds;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    document.querySelector(".stopwatch").innerHTML = minutes + " :" + seconds;
  }
}


function endGame() {
  if (matchedCards == 4){
    alert ("game over");
      visibleModal();
  }
}

function visibleModal(){
  $(modal).toggleClass("invisible");
  $(modal_pop).toggleClass("invisible");
}

function resetCards() {
  $(".card").removeClass("open show match");
  openCard = [];
  matchedCards= [];
  movesCount= 0;
  document.querySelector(".moves").innerHTML = movesCount;
  seconds = 0;
  minutes = 0;
  starCount();
  shuffleCards();
}

restart.addEventListener("click", resetCards);
