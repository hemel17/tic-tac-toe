const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#restartBtn");
let currentPlayer = "X";
let running = false;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let option = ["", "", "", "", "", "", "", "", ""];

startGame();

function startGame() {
  running = true;
  cells.forEach((cell) => cell.addEventListener("click", cellClick));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClick() {
  const cellIndex = this.id;

  if(option[cellIndex] != '' || !running){
    return
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  option[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (const condition of winConditions) {
    let [a, b, c] = condition;

    if (option[a] == "" || option[b] == "" || option[c] == "") {
      continue;
    } else if (option[a] == option[b] && option[b] == option[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!option.includes("")) {
    statusText.textContent = "Match Drawn!";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  running = true;
  option = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  statusText.textContent = `${currentPlayer}'s turn`;
}
