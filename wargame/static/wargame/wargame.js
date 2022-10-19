var suits = ["spades", "diamonds", "clubs", "hearts"];
var numbers = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
var values = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var whoWins = -1;

async function playGame(){
    let deck = createDeck();

    await sleep(1000);

    $("#game-status").html("Shuffle deck!");
    sleep(2000);

    shuffleDeck(deck);

    $("#game-status").html("Deal cards!");
    sleep(2000);

    stacks = deal(deck);
    player1Stack = stacks[0];
    player2Stack = stacks[1];

    let card1;
    let card2;
    let round = 0;
    while(player1Stack.length != 0 && player2Stack.length != 0 && round < 5000){
        card1 = player1Stack.pop();
        card2 = player2Stack.pop();
        $("#game-status").html("Play card!");

        $("#player1-faceup").attr("src","/static/images/card_back.png");
        $("#player1-facedown").attr("src","/static/images/white_background.jpeg")
        $("#player2-faceup").attr("src","/static/images/card_back.png");
        $("#player2-facedown").attr("src","/static/images/white_background.jpeg")
        await sleep(2000);

        let cardArray = shuffleCards([card1, card2]);

        $("#player1-faceup").attr("src","/static/images/PNG-cards/" + getCardImgName(card1));
        $("#player2-faceup").attr("src","/static/images/PNG-cards/" + getCardImgName(card2));

        if (card1.value > card2.value){
            $("#game-status").html("Player one's card is large!");
            shuffleCardToPlayer(player1Stack, cardArray);
        } else if (card1.value < card2.value){
            $("#game-status").html("Player two's card is large!");
            shuffleCardToPlayer(player2Stack, cardArray);
        } else { // war!
            $("#game-status").html("Go to war!");
            let result = settleWar(player1Stack, player2Stack);
            if (result == 1){
                shuffleCardToPlayer(player1Stack, cardArray);
            } else {
                shuffleCardToPlayer(player2Stack, cardArray);
            }
        }
        round++;
        await sleep(2000);
    }

    if (player1Stack.length == 0){
        whoWins = 2;
    } else if (player2Stack.length == 0){
        whoWins = 1;
    } else {
        whoWins = 0;
    }

    addScore();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCardImgName(card){
    return card.number + "_of_" + card.suit + ".png";
}

async function settleWar(player1Stack, player2Stack){
    if (player1Stack.length == 0){
        return 2;
    }
    if (player2Stack.length == 0){
        return 1;
    }

    let cardFaceUp1;
    let cardFaceUp2;
    let cardFaceDown1;
    let cardFaceDown2;


    if (player1Stack.length == 1){
        cardFaceDown1 = null;
        cardFaceDown2 = player2Stack.pop();
    } else if (player2Stack.length == 1){
        cardFaceDown2 = null;
        cardFaceDown1 = player1Stack.pop();
    } else {
        cardFaceDown1 = player1Stack.pop();
        cardFaceDown2 = player2Stack.pop();    
    }
    cardFaceUp1 = player1Stack.pop();
    cardFaceUp2 = player2Stack.pop(); 

    await sleep(2000);
    $("#game-status").html("Play card during war!");
    $("#player1-faceup").attr("src","/static/images/card_back.png");
    $("#player1-facedown").attr("src","/static/images/card_back.png")
    $("#player2-faceup").attr("src","/static/images/card_back.png");
    $("#player2-facedown").attr("src","/static/images/card_back.png")
    await sleep(2000);

    $("#player1-faceup").attr("src","/static/images/PNG-cards/" + getCardImgName(cardFaceUp1));
    $("#player2-faceup").attr("src","/static/images/PNG-cards/" + getCardImgName(cardFaceUp2));

    let cardArray = shuffleCards([cardFaceDown1, cardFaceUp1, cardFaceDown2, cardFaceUp2]);
    if (cardFaceUp1.value > cardFaceUp2.value){
        $("#game-status").html("Player one's card is large!");
        shuffleCardToPlayer(player1Stack, cardArray);
        return 1;
    } else if (cardFaceUp1.value < cardFaceUp2.value){
        $("#game-status").html("Player two's card is large!");
        shuffleCardToPlayer(player2Stack, cardArray);
        return 2;
    } else { // war!
        $("#game-status").html("Go to war!");
        let result = settleWar(player1Stack, player2Stack);
        if (result == 1){
            shuffleCardToPlayer(player1Stack, cardArray);
            return 1;
        } else {
            shuffleCardToPlayer(player2Stack, cardArray);
            return 2;
        }
    }
}

function shuffleCards(cardArray){
    let currentIndex = cardArray.length;
    let randomIndex;

    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [cardArray[currentIndex], cardArray[randomIndex]] = [
          cardArray[randomIndex], cardArray[currentIndex]];
    }
    
    return cardArray;
}

function shuffleCardToPlayer(playerStack, cardArray){
    if (!playerStack){
        return;
    }
    if (!cardArray){
        return;
    }

    for (let i = 0; i < cardArray.length; i++){
        if (cardArray[i]){
            playerStack.unshift(cardArray[i]);
        }
    }
}

function createDeck(){
	let newDeck = new Array();

	for(let i = 0; i < suits.length; i++){
	    for(let j = 0; j < values.length; j++){
			let card = {value: values[j], suit: suits[i], number: numbers[j]};
			newDeck.push(card);
		}
	}
	return newDeck;
}

function shuffleDeck(deck){
    // switch two cards position and repeat 1000 times
    for (let i = 0; i < 1000; i++){
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

function deal(deck){
    if (deck == []){
        return;
    }
    
    let player1Stack = [];
    let player2Stack = [];
    for (let i = 0; i < deck.length; i++){
        if ((i % 2) == 0){
            player1Stack.push(deck[i]);
        } else {
            player2Stack.push(deck[i]);
        }
    }
    return [player1Stack, player2Stack]
}

function addScore(){
    $.ajax({
        url: "/wargame/add-score",
        type: "POST",
        data: "who_wins="+encodeURIComponent(whoWins)+"&csrfmiddlewaretoken="+encodeURIComponent(getCSRFToken()),
        dataType : "json",
        success: endGame,
        error: updateError
    });
}


function endGame(responseText){
    let response = responseText;

    if (response.who_wins == 1){
        alert("Player 1 wins!");
    } else if (response.who_wins == 2){
        alert("player 2 wins!");
    } else {
        alert("A tie!");
    }

}






