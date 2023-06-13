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
    const { name, token } = player;
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
  const playerOne = player("PlayerOne", 1);
  const playerTwo = player("PlayerTwo", 2);
  let count = 1;

  if (count === 1) {
    console.log(playerOne.name, "turn:");
  }
  const updateCount = (winner) => {
    count++;
    if (count === 10 && winner === null) {
      console.log("Tie");
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
  };

  const playRound = (player, cell) => {
    const tokenAdded = gameBoard.addToken(player, cell);
    if (tokenAdded) {
      updateDOM(cell);
      const winner = evalWinner(player);
      console.log(winner);
      updateCount(winner);
      //   setNextRound();
    } else {
      alert("Error,cell already filled");
    }
  };

  const gameCells = document.querySelectorAll(".game-cell");
  for (let gameCell of gameCells) {
    gameCell.addEventListener("click", (e) => {
      const cell = gameCell.dataset.cell;
      const player = getTurn();
      console.log(player);
      playRound(player, cell);
    });
  }
})();
