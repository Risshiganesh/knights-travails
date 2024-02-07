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

  function searchMoves(startCoord, endCoord) {
    // START COORDS
    const startX = startCoord[0];
    const startY = startCoord[1];
    const startGrid = board[startX][startY];

    // END COORDS
    const endX = endCoord[0];
    const endY = endCoord[1];

    let index = 0;

    const queue = [startGrid];

    const prevCoords = [startGrid.coordinates];

    const excludedCoord = [];

    // node not found
    let notFound = true;
    // replace condition to notFound later
    while (notFound) {
      const currentGrid = queue[index];
      const currentX = currentGrid.coordinates[0];
      const currentY = currentGrid.coordinates[1];

      const movesList = currentGrid.knightMoves;

      if (currentX === endX && currentY === endY) {
        // console.log("FOUND");

        notFound = false;
        getSteps(currentGrid);
        break;
      }

      for (let j = 0; j < movesList.length; j++) {
        const nextCoord = movesList[j];

        const nextGrid = board[nextCoord[0]][nextCoord[1]];

        let exclude = false;

        //   This part filters out the previously read coords.
        //   Previously read coords is filtered out to prevent backtracking.
        //
        for (let k = 0; k < prevCoords.length; k++) {
          const excludeCoord = prevCoords[k];

          if (
            nextCoord[0] === excludeCoord[0] &&
            nextCoord[1] === excludeCoord[1]
          ) {
            excludedCoord.push(nextCoord);
            exclude = true;

            break;
          }
        }

        if (exclude) {
          //   console.log("EXCLUDED");
          continue;
        }

        nextGrid.predecessor = currentGrid;
        queue.push(nextGrid);
        prevCoords.push(nextGrid.coordinates);
      }
      //   prevCoords.push("NEXT");

      // remove this later
      //   notFound = false;
      index++;
    }

    // console.log(queue);
    // console.log(prevCoords);
    // console.log("EXCLUDED");
    // console.log(excludedCoord);
  }

  function getSteps(node) {
    let temp = node;

    // console.log(node);

    const stepsArray = [];
    while (temp) {
      // console.log(temp.coordinates);
      stepsArray.push(temp.coordinates);

      temp = temp.predecessor;
    }

    const reversedArray = stepsArray.reverse();

    console.log(
      `You made it in ${reversedArray.length - 1} moves!  Here's your path: `
    );

    reversedArray.forEach((array) => {
      console.log(`[${array[0]},${array[1]}]`);
    });

    // console.log(stepsArray.reverse());
  }

  searchMoves(start, end);
}

knightMoves([0, 0], [7, 7]);
