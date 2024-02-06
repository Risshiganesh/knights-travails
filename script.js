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

    console.log(queue[index]);
    while (queue[index]) {
      //   console.log(queue[index].coordinates === end);
      const currentX = queue[index].coordinates[0];
      const currentY = queue[index].coordinates[1];
      //   console.log(queue[index].coordinates === end);

      //   console.log(currentX === endX && currentY === endY);
      //   console.log(queue[index].coordinates);
      //   console.log(end);
      if (currentX === endX && currentY === endY) {
        console.log("FOUND");
        console.log(queue[index]);
        break;
      }

      // convert to ordinary for loop to use continue
      //   queue[index].knightMoves.forEach((moves) => {
      //     const moveX = moves[0];
      //     const moveY = moves[1];
      //     const moveToGrid = board[moveX][moveY];
      //     if (moveX === exclude[0] && moveY === exclude[1]) {
      //     }
      //     exclude = queue[index].coordinates;
      //     moveToGrid.predecessor = queue[index];
      //     queue.push(moveToGrid);
      //     // console.log(moveToGrid);
      //   });

      for (let j = 0; j < queue[index].knightMoves.length; j++) {
        const moves = queue[index].knightMoves[j];
        // console.log("MOVES");
        // console.log(moves);
        const moveX = moves[0];
        const moveY = moves[1];
        const moveToGrid = board[moveX][moveY];
        // console.log("axisX: " + exclude[0] + ", axisY: " + exclude[1]);

        //   CHECK IF THIS WORKS CORRECTLY.
        if (queue[index].predecessor) {
          const parentX = queue[index].predecessor.coordinates[0];
          const parentY = queue[index].predecessor.coordinates[1];
          if (parentX === moveX && parentY === moveY) {
            console.log("EXCLUDE");
            continue;
          }
        }

        moveToGrid.predecessor = queue[index];
        queue.push(moveToGrid);
      }

      index++;
    }

    function getSteps(node) {}

    // const startGrid = startX;
    // console.log(startGrid);
  }

  searchMoves(start, end);

  return {
    board,
  };
}

// console.log(knightMoves([0, 0], [3, 3]));

const newBoard = knightMoves([0, 0], [3, 3]);

console.log(newBoard.board);
