const board = document.getElementById('board');
const status = document.getElementById('status');


let currentPlayer = 'X'; 
let gameActive = true;
let gameMode = 'pvp'; 
let aiDifficulty = 'easy';
const gameBoard = Array(9).fill(null);
const cells = []; 

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];


function evaluateWinner(boardState) {
  for (let pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
}

function checkWinner() {
  return evaluateWinner(gameBoard);
}

function handleClick(index) {
  if (!gameActive || gameBoard[index]) return;
  

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add('taken');


  const winner = checkWinner();
  if (winner) {
    status.textContent = `Player ${winner} wins!`;
    gameActive = false;
    return;
  }
  
 
  if (gameBoard.every(cell => cell !== null)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
  
 
  if (gameMode === 'pva' && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

function resetGame() {
  
  gameBoard.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  status.textContent = "Player X's turn";
  gameActive = true;
  
 
  const aiSelect = document.getElementById('ai-difficulty');
  if (aiSelect) {
    aiDifficulty = aiSelect.value;
  }
}

function createBoard() {
  for (let index = 0; index < 9; index++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `cell-${index}`;
    cell.addEventListener('click', () => handleClick(index));
    board.appendChild(cell);
    cells.push(cell);
  }
}

createBoard();

// --- AI Functions ---

function aiMove() {
  if (!gameActive) return;
  let move;
  switch (aiDifficulty) {
    case 'easy':
      move = getRandomMove();
      break;
    case 'medium':
      move = getMediumMove();
      break;
    case 'hard':
      move = getBestMove();
      break;
    default:
      move = getRandomMove();
  }
  if (move !== null) {
    handleClick(move);
  }
}

function getRandomMove() {
  const availableMoves = gameBoard
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null);
  if (availableMoves.length === 0) return null;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getMediumMove() {
 
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null) {
      gameBoard[i] = 'O';
      if (evaluateWinner(gameBoard) === 'O') {
        gameBoard[i] = null;
        return i;
      }
      gameBoard[i] = null;
    }
  }
 
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null) {
      gameBoard[i] = 'X';
      if (evaluateWinner(gameBoard) === 'X') {
        gameBoard[i] = null;
        return i;
      }
      gameBoard[i] = null;
    }
  }

  return getRandomMove();
}

function getBestMove() {
  let bestScore = -Infinity;
  let move = null;
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === null) {
      gameBoard[i] = 'O';
      let score = minimax(gameBoard, 0, false);
      gameBoard[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(boardState, depth, isMaximizing) {
  const winner = evaluateWinner(boardState);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (boardState.every(cell => cell !== null)) return 0;
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] === null) {
        boardState[i] = 'O';
        let score = minimax(boardState, depth + 1, false);
        boardState[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] === null) {
        boardState[i] = 'X';
        let score = minimax(boardState, depth + 1, true);
        boardState[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}



function toggleDifficulty() {
  const gameModeSelect = document.getElementById('game-mode');
  const aiOptions = document.getElementById('ai-options');
  gameMode = gameModeSelect.value;
  if (gameMode === 'pva') {
    aiOptions.style.display = 'block';
  } else {
    aiOptions.style.display = 'none';
  }
}
