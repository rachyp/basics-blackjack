// Global Variables //
var gameStart = "game start";
var gameCards = "game cards";
var gameResults = "game results";
var gameHitOrStand = "game hit or stand";
var currentGameMode = gameStart;

var playerHand = [];
var dealerHand = [];

var gameDeck = "empty at start";

// create deck
var createDeck = function () {
  var deck = [];
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      if (cardName == 1) {
        cardName = "ace";
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// shuffle deck
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

var checkBlackjack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var blackjack = false;

  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    blackjack = true;
  }
  return blackjack;
};

var calTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "player hand: <br> ";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "-" +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  var dealerMessage = "dealer hand: <br>";
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "-" +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

var displayHandTotalValue = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br> player total hand value: " +
    playerHandValue +
    "<br> dealer total hand value:" +
    dealerHandValue;
  return totalHandValueMessage;
};

// GAME //
var main = function (input) {
  var outputMessage = "";
  // cards are drawn
  if (currentGameMode == gameStart) {
    gameDeck = createNewDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log("player hand ==>");
    console.log(playerHand);
    console.log("dealer hand ==>");
    console.log(dealerHand);

    currentGameMode = gameCards;

    outputMessage =
      "cards have been drawn for all players. <br><br> click the 'submit' button again to evaluate the cards";

    return outputMessage;
  }

  // check for blackjack
  if (currentGameMode == gameCards) {
    var playerBlackjack = checkBlackjack(playerHand);
    var dealerBlackjack = checkBlackjack(dealerHand);

    if (playerBlackjack == true || dealerBlackjack == true) {
      if (playerBlackjack == true && dealerBlackjack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "both dealer and player has blackjack, it is a blackjack tie!";
      } else if (playerBlackjack == true && dealerBlackjack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "player has blackjack <br><br> player wins!";
      } else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " dealer has blackjack <br><br> dealer wins!";
      }
      console.log(outputMessage);
    } else {
      outputMessage = "neither player or dealer have blackjack";
      console.log(outputMessage);
    }

    var playerHandTotalValue = calTotalHandValue(playerHand);
    var dealerHandTotalValue = calTotalHandValue(dealerHand);
    console.log("player hand value", playerHandTotalValue);
    console.log("dealer hand value", dealerHandTotalValue);

    if (playerHandTotalValue == dealerHandTotalValue) {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> please enter 'hit' or 'stand' to continue <br>" +
        displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue);
    } else if (playerHandTotalValue > dealerHandTotalValue) {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> please enter 'hit' or 'stand' to continue <br>" +
        displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue);
    } else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> please enter 'hit' or 'stand' to continue <br>" +
        displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue);
    }
    currentGameMode = gameHitOrStand;
    return outputMessage;
  }
  // hitting or standing, players choice
  if (currentGameMode == gameHitOrStand) {
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> you drew a card, please enter either "hit" or "stand" to continue';
    } else if (input == "stand") {
      var playerHandTotalValue = calTotalHandValue(playerHand);
      var dealerHandTotalValue = calTotalHandValue(dealerHand);
      console.log("player hand value", playerHandTotalValue);
      console.log("dealer hand value", dealerHandTotalValue);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calTotalHandValue(dealerHand);
      }

      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> it is a tie~ <br> click on the 'submit' button to play another round <br> " +
          displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue);
      } else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> player wins~ <br> click on the 'submit' button to play another round <br>" +
          displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue);
      } else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> dealer wins~ <br> click on the 'submit' button to play another round <br> " +
          displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue);
      }
      currentGameMode = gameStart;
      playerHand = [];
      dealerHand = [];
    } else {
      outputMessage =
        'oops wrong input, please enter either "hit" or "stand" only <br><br> ' +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }
    return outputMessage;
  }
};
