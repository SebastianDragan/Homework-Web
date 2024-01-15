const sounds = [
  "assets/sound1.mp3",
  "assets/sound2.mp3",
  "assets/sound3.mp3",
  "assets/sound4.mp3",
  "assets/sound1.mp3",
  "assets/sound2.mp3",
  "assets/sound3.mp3",
  "assets/sound4.mp3",
];

const memoryGame = document.getElementById("memory-game");
let flippedCards = [];
let flippedIndices = [];

// Shuffle the sounds array
sounds.sort(() => Math.random() - 0.5);

// Create card elements
sounds.forEach((sound, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;
  card.addEventListener("click", flipCard);
  memoryGame.appendChild(card);
});

function flipCard() {
  const card = this;
  const index = card.dataset.index;

  if (flippedIndices.length < 2 && !flippedIndices.includes(index)) {
    card.textContent = sounds[index];
    card.style.backgroundColor = "#fff";

    flippedCards.push(sounds[index]);
    flippedIndices.push(index);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [firstIndex, secondIndex] = flippedIndices;
  const [firstSound, secondSound] = flippedCards;

  if (firstSound === secondSound) {
    // Matched
    alert("Matched!");
  } else {
    // Not matched
    const cards = document.querySelectorAll(".card");
    cards[firstIndex].textContent = "";
    cards[secondIndex].textContent = "";
    cards[firstIndex].style.backgroundColor = "#ddd";
    cards[secondIndex].style.backgroundColor = "#ddd";
  }

  flippedCards = [];
  flippedIndices = [];
}
