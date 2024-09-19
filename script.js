function createNewCard() {
  /* Step 1: Create a new div element and assign it to a variable called cardElement. */
  const cardElement = document.createElement("div");
  
  /* Step 2: Add the "card" class to the variable 'cardElement' from the previous step. */
  cardElement.classList.add("card");

  /* Step 3: Write the HTML for the children of the card element (card-down and card-up) */
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>
  `;

  /* Step 4: Return the cardElement. */
  return cardElement;
}

function appendNewCard(parentElement) {
  /* Step 1: Create a new card by calling createNewCard() and assign it to a variable named cardElement. */
  const cardElement = createNewCard();

  /* Step 2: Append the card element to the parentElement (making the card element a "child").  */
  parentElement.appendChild(cardElement);

  /* Step 3: Return the card element. */
  return cardElement;
}

function shuffleCardImageClasses() {
  /* Step 1: Create a new array that contains two of each image class string in order */
  const classesArray = [
    "image-1", "image-1", "image-2", "image-2", 
    "image-3", "image-3", "image-4", "image-4", 
    "image-5", "image-5", "image-6", "image-6"
  ];

  /* Step 2: Shuffle the array using lodash (underscore.js) */
  let shuffledArray = _.shuffle(classesArray);

  /* Step 3: Return the shuffled array of class names. */
  return shuffledArray;
}

function createCards(parentElement, shuffledImageClasses) {
  /* Step 1: Make an empty array to hold our card objects. */
  const customCardObjects = [];

  /* Step 2: Loop 12 times to create the 12 cards we need. */
  for (let i = 0; i < 12; i++) {
    /* Step 2(a): Create/append a new card */
    const cardElement = appendNewCard(parentElement);

    /* Step 2(b): Add the corresponding image class to the card element */
    cardElement.classList.add(shuffledImageClasses[i]);

    /* Set background image for the card-up div using the image class */
    const cardUp = cardElement.querySelector(".card-up");
    cardUp.style.backgroundImage = `url('images/${shuffledImageClasses[i]}.png')`;

    /* Step 2(c): Add the card object to the array */
    const customCard = {
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i],
    };

    customCardObjects.push(customCard);
  }

  /* Step 3: Return the array of 12 card objects. */
  return customCardObjects;
}

function doCardsMatch(cardObject1, cardObject2) {
  /* Step 1: Check if two cards match based on the image class */
  return cardObject1.imageClass === cardObject2.imageClass;
}

function onCardFlipped(newlyFlippedCard) {
  incrementCounter("flips", document.getElementById("flip-count"));

  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  incrementCounter("matches", document.getElementById("match-count"));
  lastCardFlipped.element.classList.add("border-glow");
  newlyFlippedCard.element.classList.add("border-glow");

  if (counters["matches"] === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

  lastCardFlipped = null;
}

function resetGame() {
  const cardContainer = document.getElementById("card-container");

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  document.getElementById("flip-count").innerText = "0";
  document.getElementById("match-count").innerText = "0";

  counters = {};
  lastCardFlipped = null;
  setUpGame();
}

setUpGame();
