const evalWinner = (player) => {
  const board = gameBoard.getBoard();
  const { name, token } = player;
  let marker = board[0][0];
  for (let i = 0; i < 3; i++) {
    marker = board[i][0];
    if (marker != 0) {
      for (let j = 0; j < 3; j++) {
        if (marker !== board[i][j]) {
          //   console.log(marker, board[i][j]);
          //   console.log("game not over");
          break;
        } else if (j === 2) {
          console.log(`${name} wins the game`);
          return player;
        }
      }
    }
  }

  marker = board[0][0];
  for (let i = 0; i < 3; i++) {
    marker = board[0][i];
    if (marker != 0) {
      for (let j = 0; j < 3; j++) {
        if (marker !== board[j][i]) {
          //   console.log(marker, board[j][i]);
          //   console.log("game not over");
          break;
        } else if (j === 2) {
          console.log(`${name} wins the game`);
          return player;
        }
      }
    }
  }

  marker = board[0][0];
  if (marker !== 0) {
    for (let i = 0, j = 0; i < 3 && j < 3; i++, j++) {
      if (marker !== board[i][j]) {
        // console.log(marker, board[i][j]);
        // console.log("game not over");
        break;
      } else if (j === 2 && i == 2) {
        console.log(`${name} wins the game`);
        return player;
      }
    }
  }

  marker = board[0][2];
  if (marker !== 0) {
    for (let i = 0, j = 2; i < 3 && j >= 0; i++, j--) {
      if (marker !== 0 && marker !== board[i][j]) {
        // console.log(marker, board[i][j]);
        // console.log("game not over");
        break;
      } else if (j === 0 && i == 2) {
        console.log(`${name} wins the game`);
        return player;
      }
    }
  }
  return null;
};
