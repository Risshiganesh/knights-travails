function knightMoves(start, end) {
  if (
    start[0] < 0 ||
    start[1] < 0 ||
    start[0] > 7 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[1] < 0 ||
    end[0] > 7 ||
    end[1] > 7
  ) {
    console.log("Please input numbers, 0 and above & 7 and below.");
    return;
  }
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
    //   Refactor this loop in 2nd round because it's quadratic complexity.
    while (notFound) {
      const currentGrid = queue[index];
      const currentX = currentGrid.coordinates[0];
      const currentY = currentGrid.coordinates[1];

      const movesList = currentGrid.knightMoves;

      if (currentX === endX && currentY === endY) {
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
        //   This is quadratic complexity because it's a triple loop.
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
          continue;
        }

        nextGrid.predecessor = currentGrid;
        queue.push(nextGrid);
        prevCoords.push(nextGrid.coordinates);
      }
      index++;
    }
  }

  function getSteps(node) {
    let temp = node;

    const stepsArray = [];
    while (temp) {
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
  }

  searchMoves(start, end);
}

knightMoves([0, 0], [7, 7]);
// For [0,0] to [7,7] it's a little slow, find out why when you refactor.
