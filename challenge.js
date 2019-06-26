/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Challenge : add 2 dices, user can change the winning score.
*/

var scores, roundScores, activePlayer, dice, gamePlaying;
// "0"is the player 0 and "1" player 1
init ();

// Selecting the roll button
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        //using an anonymous function
        // 1. A random number
        var dice1 = 1 + Math.floor(Math.random() * 6); // generating random number between 1 and 6
        var dice2 = 1 + Math.floor(Math.random() * 6);

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        // 3.  Update the round score only if the rolled number isn't 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore; 
        } else {   
            // Next player
            nextPlayer();
        } 
        
    };
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the user interface
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];
        
        //Adding a final value
        var input = document.querySelector('.final-score').value;
        var winningScore
        // Undefined, 0, null are coerced to false
        // otherwise is true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!' 
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + '-panel').classList.add('winner');
            document.querySelector(".player-" + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
        
    }
  
});

// Initialization
function init () {
    scores = [0, 0]; //scores for each player
    roundScore = 0;
    activePlayer = 0; 
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'; // selecting the dice image by accessing the CSS properties (style, display)
    
    document.getElementById("score-0").textContent = 0; // this method only works for id content
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = 'Player 1';
    document.getElementById("name-1").textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Defining the next player
function nextPlayer () {
     // Next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;

     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

     document.getElementById("dice-1").style.display = "none";
     document.getElementById("dice-2").style.display = "none";
};

// New game button
document.querySelector(".btn-new").addEventListener('click', init); // Reset scores