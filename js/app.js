/*
 * Create a list that holds all of your cards
 */
let cardImg = [
  "fas fa-cat",
  "fas fa-mask",
  "fas fa-broom",
  "fas fa-ghost",
  "fas fa-spider",
  "fas fa-hat-wizard",
  "fas fa-book-dead",
  "fas fa-skull-crossbones",
  "fas fa-cat",
  "fas fa-mask",
  "fas fa-broom",
  "fas fa-ghost",
  "fas fa-spider",
  "fas fa-hat-wizard",
  "fas fa-book-dead",
  "fas fa-skull-crossbones",
];

let openCard = [];
let matchedCards = [];
let cardCat = document.querySelectorAll(".card");
let deck = document.querySelector(".deck");
let stars = document.querySelectorAll(".fa-cloud-moon");
let numStars = 3;
let movesCount = 0;
var restart = document.querySelector(".restart");
let seconds = 0;
let minutes = 0;
let modal = document.querySelector(".modal");
let modal_pop = document.querySelector(".modal_pop");
let modal_button = document.querySelector(".modal_button");

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

let flipCard = function(flipCard) { 
  if (flipCard.target.className === "card" && openCard.length < 2) {
    $(this).toggleClass("open show");
    openCard.push(this); //add card to array
    if (openCard.length === 2) {
      setTimeout(match, 1000);
      moves();
      starCount();
    }
  }
};

for (var card of cardCat) {
  //for loop/event function inspired by Matt's tutorial
  card.addEventListener("click", flipCard);
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
    endGame();
    openCard = [];
  } else {
    $(openCard[0]).removeClass("open show");
    $(openCard[1]).removeClass("open show");
    openCard = [];
  }
}

function moves() {
  movesCount++;
  if (movesCount == 1){
  document.querySelector(".moves").innerHTML = movesCount + " Move";
}
  else {
    document.querySelector(".moves").innerHTML = movesCount + " Moves";
  }
}

function starCount() {
  for (var star of stars) { // puts stars back as well during reset
    if (movesCount === 10 || movesCount === 20 || moves === 30) {
      if (star.style.display !== "none") {
        star.style.display = "none";
        numStars--;
        break;
      }
    }
  }
}
function addStar(){
  for (var star of stars){
  if (star.style.display == "none") {
      star.style.display = "inline-block";
    }
}
}
var  timer = setInterval(timeCount, 1000);

function timeCount() {
  seconds++;
  if (seconds == 0) {
    document.querySelector(".stopwatch").innerHTML = minutes + " :00";
  }
  else if (seconds > 0 && seconds < 10) {
    document.querySelector(".stopwatch").innerHTML = minutes + " : 0" + seconds;
  } else if (seconds < 60) {
    document.querySelector(".stopwatch").innerHTML = minutes + " :" + seconds;
  } else if (seconds == 60) {
    seconds = 00;
    minutes++;
    document.querySelector(".stopwatch").innerHTML = minutes + " :00";
  }
}

function endGame() {
  if (matchedCards.length == 16) {
    stopTimer();
    visibleModal();
    printStats();
  }
}

function stopTimer() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
}

function visibleModal() {
  $(modal).toggleClass("visible");
  $(modal_pop).toggleClass("visible");
  }

function printStats() { //insert stats into HTML code- help from cohort
  let statsMove = document.querySelector(".statsMoves"); 
  let statTime = document.querySelector(".statsTime");
  let statsStar = document.querySelector(".statsStars");
    statTime.innerHTML = `Time: ${document.querySelector('.stopwatch').innerText}`; 
    statsMove.innerHTML = `Moves: ${document.querySelector('.moves').innerText}`; 
  console.log(numStars)
    statsStar.innerHTML = `Moons: ${numStars}`;
}

  document.querySelector(".modal_button").addEventListener("click", resetCards); 
 

function resetCards() { //used for Play again and reset button
  $(".card").removeClass("open show match");
  openCard = [];
  matchedCards = [];
  movesCount = 0;
  document.querySelector(".moves").innerHTML = movesCount;
  stopTimer();
  starCount();
  shuffleCards();
  addStar();
  $(modal).removeClass("visible");
  $(modal_pop).removeClass("visible");
  setInterval(timeCount, 1000);
}

restart.addEventListener("click", resetCards);
