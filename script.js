// Pseudocode.

// Create coordinates for all grids?

// Use adjacent lists.

// Make sure to not include any coordinate values below 0 and above 7.

// Use depth first search.

// Before you add a child node to the queue, add predecessor node's reference to it.

// Once node is found, assign it to a variable, push coordinate values and recursive all the way to predecessor.

// Then .reverse().

// Return.

// const grid = {

// coordinate: [0,0],
// moves: [//should have 8 moves at max],
// predecessor: null,

// }

function knightMoves(start, end) {
  // x arrays contain y arrays in board.
  // better for immediate access.
  const board = [];

  let x = 0;
  let y = 0;

  function createGrid(x, y) {
    const grid = {
      coordinates: [x, y],
      knightMoves: [], //should have 8 moves max.
      predecessor: null,
    };

    return grid;
  }

  function createKnightMoves(grid) {
    const xMovesArray = [2, 1, -2, -1, 2, 1, -2, -1];
    const yMovesArray = [1, 2, -1, -2, -1, -2, 1, 2];
    let index = 0;

    const knightMoves = grid.knightMoves;

    const x = grid.coordinates[0];
    const y = grid.coordinates[1];

    // Move 1
    while (index < xMovesArray.length) {
      const nextX = x + xMovesArray[index];
      const nextY = y + yMovesArray[index];
      if (nextX >= 0 && nextX <= 7 && nextY >= 0 && nextY <= 7) {
        knightMoves.push([nextX, nextY]);
      }

      index++;
    }
  }

  // create board
  board[0] = []; // create first x array
  while (!(x === 7 && y === 8)) {
    if (y === 8) {
      x++;
      // create new x array everytime x is incremented
      board[x] = [];
      y = 0;
    }

    const newGrid = createGrid(x, y);
    const gridX = board[x];
    gridX.push(newGrid);

    createKnightMoves(newGrid);
    // console.log([x, y]);
    y++;
  }

  function searchMoves(start, end) {
    const startX = start[0];
    const startY = start[1];
    const startGrid = board[startX][startY];

    const endX = end[0];
    const endY = end[1];

    let index = 0;

    const queue = [startGrid];
    let found = false;
    // let exclude = [null, null];

    // console.log(queue[index]);
    while (queue[index]) {
      const currentGrid = queue[index];
      const currentX = currentGrid.coordinates[0];
      const currentY = currentGrid.coordinates[1];
      if (currentX === endX && currentY === endY) {
        console.log("FOUND");

        getSteps(currentGrid);
        break;
      }

      for (let j = 0; j < currentGrid.knightMoves.length; j++) {
        const moves = currentGrid.knightMoves[j];
        const moveX = moves[0];
        const moveY = moves[1];
        const moveToGrid = board[moveX][moveY];

        //   ALMOST
        console.log(currentGrid);
        if (currentGrid.predecessor) {
          const parentX = currentGrid.predecessor.coordinates[0];
          const parentY = currentGrid.predecessor.coordinates[1];
          if (parentX === moveX && parentY === moveY) {
            console.log("EXCLUDE");
            continue;
          }
        }

        moveToGrid.predecessor = currentGrid;
        queue.push(moveToGrid);
      }

      index++;
    }

    function getSteps(node) {
      let temp = node;

      console.log(node);

      const stepsArray = [];
      while (temp) {
        // console.log(temp.coordinates);
        stepsArray.push(temp.coordinates);

        temp = temp.predecessor;
      }

      console.log(stepsArray.reverse());
    }

    // const startGrid = startX;
    // console.log(startGrid);
  }

  searchMoves(start, end);

  return;
}

// console.log(knightMoves([0, 0], [3, 3]));

const newBoard = knightMoves([0, 0], [3, 5]);

// console.log(newBoard.board);
