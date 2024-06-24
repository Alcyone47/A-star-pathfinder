export function aStar(start, end, grid) {
  if (!start || !end || !grid) {
    throw new Error('Invalid parameters for A* algorithm');
  }

  function heuristic(a, b) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return Math.sqrt(dx * dx + dy * dy);
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
    const openSet = [start];
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    gScore[start] = 0;
    fScore[start] = heuristic(start, end);

    while (openSet.length > 0) {
      let current = openSet[0];
      for (const node of openSet) {
        if (fScore[node] < fScore[current]) {
          current = node;
        }
      }

      if (current === end) {
        const path = [];
        let reconstructNode = end;
        while (reconstructNode !== start) {
          path.push(reconstructNode);
          reconstructNode = cameFrom[reconstructNode];
        }
        path.push(start);
        return path.reverse();
      }

      openSet.splice(openSet.indexOf(current), 1);

      const neighbors = getNeighbors(current, grid);

      for (const neighbor of neighbors) {
        const tentativeGScore = gScore[current] + 1;

        if (!gScore[neighbor] || tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
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
