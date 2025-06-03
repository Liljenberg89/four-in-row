const playField = document.querySelector(".playground");
const gameOverScreen = document.getElementById("gameover-screen");
const column = [[], [], [], [], [], [], [], []];
let num = 0;

const playerOne = {
  name: "playerOne",
  color: "blue",
  coords: [[], [], [], [], [], []], // horizontal
  vertical: [[], [], [], [], [], [], []],
  allCoords: [],
};
const playerTwo = {
  name: "playerTwo",
  color: "red",
  coords: [[], [], [], [], [], []], // horizontal
  vertical: [[], [], [], [], [], [], []],
  allCoords: [],
};

let activePlayer = [playerOne, playerTwo];

function generatePlayField() {
  let row = 6;
  let col = 1;
  let id = 1;
  for (let i = 1; i <= 6; i++) {
    for (let i = 1; i <= 7; i++) {
      const box = document.createElement("div");
      box.classList.add("box");

      id++;
      box.setAttribute("data-row", row);
      box.setAttribute("data-col", col);
      col++;
      if (col === 8) {
        col = 1;
      }

      playField.appendChild(box);
    }
    row--;
  }
}

function MarkerInPlay(col) {
  for (let i = 0; i < column.length; i++) {
    if (column[i].length === 6) {
      document.getElementById(`${col}`).style.visibility = "hidden";
      column[i].pop();
    }
  }
}

function nextTurn() {
  if (num % 2 === 0) {
    activePlayer = [playerOne, playerTwo];
  } else {
    activePlayer = [playerTwo, playerOne];
  }
}

function makeAMove(col) {
  let player = activePlayer[0];
  column[col].push(col);
  console.log("Active player: " + player.name);

  if (player) {
    document.querySelector(
      `[data-col="${col}"][data-row="${column[col].length}"]`
    ).style.backgroundColor = `${player.color}`;
    player.coords[column[col].length - 1].push({
      col: col,
      row: column[col].length,
    });
    player.vertical[col - 1].push({
      col: col,
      row: column[col].length,
    });
    player.allCoords.push({
      col: col,
      row: column[col].length,
    });

    console.log(player.coords[column[col].length - 1]);
    console.log(player.vertical[col - 1]);
  }
  num++;

  MarkerInPlay(col);
  checkForWin();
}

function checkForWin() {
  if (fourInARow() || fourInCol() || fourInDiagonal()) {
    gameOver();
  } else {
    nextTurn();
  }
}

function fourInARow() {
  let coords = activePlayer[0].coords;

  for (let i = 0; i < coords.length; i++) {
    let count = 0;
    coords[i].sort((a, b) => a.col - b.col);

    if (coords[i].length >= 4) {
      coords[i].reduce((acc, curr) => {
        if (acc.col + 1 === curr.col) {
          count++;
          if (count === 3) {
            gameOver();
          }
        } else {
          count = 0;
        }

        return curr;
      });
    }
  }
}

function fourInCol() {
  let coords = activePlayer[0].vertical;

  for (let i = 0; i < coords.length; i++) {
    let count = 0;
    coords[i].sort((a, b) => a.row - b.row);

    if (coords[i].length >= 4) {
      coords[i].reduce((acc, curr) => {
        if (acc.row + 1 === curr.row) {
          count++;
          if (count === 3) {
            gameOver();
          }
        } else {
          count = 0;
        }

        return curr;
      });
    }
  }
}
const test = [];

function fourInDiagonal() {
  /*
  let coords = activePlayer[0].allCoords;

  coords.sort((a, b) => a.row - b.row);
  coords[i].reduce((acc, curr) => {
    if (acc.row + 1 === curr.row) {
      test.push(true);
    } else {
      test.push(false);
    }
    return curr;
  });

  console.log("---");
  console.log(activePlayer[0].allCoords);
  console.log("-----");
  console.log(test);
  */
}

function gameOver() {
  for (let i = 1; i <= 7; i++) {
    document.getElementById(`${i}`).style.display = "none";
  }
  gameOverScreen.style.display = "flex";
  document.getElementById(
    "winner"
  ).textContent = `Winner is ${activePlayer[0].color}!`;
}

generatePlayField();
