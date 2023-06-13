//this is a module
const gameBoard = (function () {
  let board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;

  const addToken = (player, cell) => {
    // const playerOne = 1;
    // const playerTwo = 2;
    const { token } = player;
    const [row, col] = cell.split("-");
    if (board[row][col] === 0) {
      board[row][col] = token;
      return true;
    } else {
      return false;
    }
  };
  return { addToken, getBoard };
})();

//this is a factory function
const player = (name, token) => {
  return { name, token };
};

//this is a module
const gameController = (function () {
  const playerOne = player("PlayerOne", "X");
  const playerTwo = player("PlayerTwo", "O");
  let count = 1;

  if (count === 1) {
    console.log(playerOne.name, "turn:");
    const turnDisplay = document.querySelector(".turn-display");
    turnDisplay.textContent = `${playerOne.name}'s turn`;
  }
  const updateCount = (winner) => {
    count++;
    const player = getTurn();
    console.log(player.name, "turn:");
    const turnDisplay = document.querySelector(".turn-display");
    turnDisplay.textContent = `${player.name}'s turn`;
    if (count === 10 && winner === null) {
      declareWinner("Tie");
    }
  };

  const getTurn = () => {
    return count % 2 === 0 ? playerTwo : playerOne;
  };

  const updateDOM = (cell) => {
    const board = gameBoard.getBoard();
    const [row, col] = cell.split("-");
    const dataCell = `${row}-${col}`;
    const gameCells = [...document.querySelectorAll(".game-cell")];

    const newCell = gameCells.find(
      (gameCell) => gameCell.dataset.cell === dataCell
    );
    newCell.textContent = board[row][col];
    if (board[row][col] === "X") {
      newCell.classList.toggle("one");
    } else {
      newCell.classList.toggle("two");
    }
  };

  const declareWinner = (name) => {
    const winDisplay = document.querySelector(".winner-display");
    if (name === "Tie") {
      winDisplay.textContent = `It's a ${name}`;
    } else {
      winDisplay.textContent = `${name} wins the game`;
    }
    winDisplay.classList.toggle("active");
    const gameCells = document.querySelectorAll(".game-cell");
    for (let gameCell of gameCells) {
      gameCell.removeEventListener("click", playRound);
    }
  };
  const playRound = (e) => {
    const cell = e.target.dataset.cell;
    const player = getTurn();
    console.log(player, cell);
    const tokenAdded = gameBoard.addToken(player, cell);
    if (tokenAdded) {
      updateDOM(cell);
      const winner = evalWinner(player);
      if (winner) {
        declareWinner(winner);
      } else {
        updateCount(winner);
      }
    } else {
      alert("Error,cell already filled");
    }
  };

  const gameCells = document.querySelectorAll(".game-cell");
  for (let gameCell of gameCells) {
    gameCell.addEventListener("click", playRound);
  }
})();
