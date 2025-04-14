const boardSize = 10;
const bombCount = 10;
let gameBoard = [];
let bombPositions = [];
let gameEnded = false;

const gameBoardConstant = [
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
  [], [], [], [], [], [], [], [], [], [],
]

// Initialize the game
function initGame() {
  const gameBoardElement = document.getElementById('game-board');
  gameBoardElement.innerHTML = ''; // Clear the board
  gameEnded = false; // Reset game state

  gameBoard = [];
  bombPositions = generateBombs(boardSize, bombCount);

  for (let row = 0; row < boardSize; row++) {
    const rowArray = [];
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // on click element
      cell.addEventListener('click', () => revealCell(row, col));

      // on right click element
      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        toggleFlag(row, col);
      });

      rowArray.push(cell);
      gameBoardElement.appendChild(cell);
    }
    gameBoard.push(rowArray);
  }
  console.log(gameBoard)
}

// Generate bomb positions randomly
function generateBombs(size, count) {
  const bombs = [];
  while (bombs.length < count) {
    const position = Math.floor(Math.random() * size * size);
    if (!bombs.includes(position)) {
      bombs.push(position);
    }
  }

  return bombs;
}

// Reveal a cell when clicked
function revealCell(row, col) {

}

// Count bombs around a cell
function countBombsAround(row, col) {
  let count = 0;

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
        const index = r * boardSize + c;
        if (bombPositions.includes(index)) {
          count++;
        }
      }
    }
  }

  return count;
}

// Recursively reveal all empty cells around a cell with no bombs
function revealEmptyCells(row, col) {

}

// Toggle flagging on a cell
function toggleFlag(row, col) {

}

// Reveal all bombs when the game is over
function revealAllBombs() {

}

// End the game (either won or lost)
function endGame(won) {
  gameEnded = true;
  if (won) {
    alert('Congratulations, You Win!');
  } else {
    alert('Game Over! You clicked on a bomb!');
    revealAllBombs();
  }
}

// Check if the player has won
function checkWinCondition() {

}

// Reset the game
function resetGame() {
  initGame();
}

// Initialize the game when the page loads
window.onload = initGame;
