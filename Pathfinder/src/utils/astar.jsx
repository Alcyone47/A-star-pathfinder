export function aStar(start, end, grid) {
  if (!start || !end || !grid) {
    throw new Error('Invalid parameters');
  }

  function heuristic(a, b) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return dx + dy; 
  }

  function getNeighbors(node, grid) {
    const neighbors = [];
    const { x, y } = node;
    const numRows = grid.length;
    const numCols = grid[0].length;

    const directions = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 }
    ];

    for (const dir of directions) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;

      if (newX >= 0 && newX < numCols && newY >= 0 && newY < numRows) {
        neighbors.push(grid[newY][newX]);
      }
    }

    return neighbors;
  }

  function aStarAlgorithm(start, end, grid) {
    let openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    gScore.set(start, 0);
    fScore.set(start, heuristic(start, end));

    while (openSet.length > 0) {
      let current = openSet.reduce((acc, node) => fScore.get(node) < fScore.get(acc) ? node : acc);

      if (current.x === end.x && current.y === end.y) {
        const path = [];
        let temp = current;
        while (temp) {
          path.push(temp);
          temp = cameFrom.get(temp);
        }
        return path.reverse();
      }

      openSet = openSet.filter(node => node !== current);

      const neighbors = getNeighbors(current, grid);

      for (const neighbor of neighbors) {
        const tentativeGScore = gScore.get(current) + 1;

        if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeGScore);
          fScore.set(neighbor, tentativeGScore + heuristic(neighbor, end));

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return [];
  }

  return aStarAlgorithm(start, end, grid);
}

