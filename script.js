// Initialize the player position
let playerPosition = 1;

// Snake and ladder mappings
const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

// Function to create the game board
function createBoard() {
    const board = document.getElementById("board");

    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerHTML = i;
        cell.id = `cell${i}`;
        board.appendChild(cell);
    }
}

// Function to update the player's position
function updatePlayerPosition() {
    const playerElement = document.getElementById("player");

    const row = Math.floor((100 - playerPosition) / 10);
    const col = (100 - playerPosition) % 10;

    // Calculate the player's position on the board
    const cellWidth = document.querySelector(".cell").offsetWidth;
    const cellHeight = document.querySelector(".cell").offsetHeight;

    playerElement.style.top = `${row * cellHeight}px`;
    playerElement.style.left = `${col * cellWidth}px`;

    // Update the displayed player position
    document.getElementById("playerPosition").innerText = `Player Position: ${playerPosition}`;
}

// Function to roll the dice
function rollDice() {
    // Generate a random dice roll between 1 and 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").innerText = `You rolled: ${diceRoll}`;

    // Move player forward by dice roll
    playerPosition += diceRoll;

    // If player goes beyond 100, set it to 100
    if (playerPosition > 100) {
        playerPosition = 100;
    }

    // Check for snakes and ladders
    if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
        alert(`Oops! Bitten by a snake. Go to position ${playerPosition}`);
    } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
        alert(`Yay! Climbed a ladder. Go to position ${playerPosition}`);
    }

    // Update the position on the board
    updatePlayerPosition();

    // Check if the player won
    if (playerPosition === 100) {
        alert("Congratulations! You won the game!");
        resetGame();
    }
}

// Function to reset the game
function resetGame() {
    playerPosition = 1;
    updatePlayerPosition();
    document.getElementById("diceResult").innerText = "Roll the Dice";
}

// Function to initialize the game
function initGame() {
    createBoard();

    // Add player piece on the board
    const playerElement = document.createElement("div");
    playerElement.classList.add("player");
    playerElement.id = "player";
    document.getElementById("board").appendChild(playerElement);

    // Add event listener for the dice roll button
    document.getElementById("rollButton").addEventListener("click", rollDice);

    updatePlayerPosition();
}

// Initialize the game when the page loads
window.onload = initGame;
