// src/utils/astar.js

export function aStar(start, end, grid) {
  // Ensure start, end, and grid are defined
  if (!start || !end || !grid) {
    throw new Error('Invalid parameters for A* algorithm');
  }

  // Heuristic function for A* (Euclidean distance)
  function heuristic(a, b) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Function to get neighboring nodes
  function getNeighbors(node, grid) {
    const neighbors = [];
    const { x, y } = node;
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Define possible movements (up, down, left, right)
    const directions = [
      { dx: -1, dy: 0 }, // left
      { dx: 1, dy: 0 },  // right
      { dx: 0, dy: -1 }, // up
      { dx: 0, dy: 1 }   // down
    ];

    for (const dir of directions) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;

      // Check if the new position is within bounds
      if (newX >= 0 && newX < numCols && newY >= 0 && newY < numRows) {
        neighbors.push(grid[newY][newX]);
      }
    }

    return neighbors;
  }

  // Implementation of A* algorithm
  function aStarAlgorithm(start, end, grid) {
    const openSet = [start];
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    // Initialize scores
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);

    while (openSet.length > 0) {
      // Find the node in openSet with the lowest fScore
      let current = openSet[0];
      for (const node of openSet) {
        if (fScore[node] < fScore[current]) {
          current = node;
        }
      }

      // If current is the end node, reconstruct and return path
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

      // Remove current from openSet
      openSet.splice(openSet.indexOf(current), 1);

      // Get neighboring nodes
      const neighbors = getNeighbors(current, grid);

      for (const neighbor of neighbors) {
        // Calculate tentative gScore
        const tentativeGScore = gScore[current] + 1; // Assuming uniform cost

        // Update path if this is a better path
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

    // If no path found, return empty array
    return [];
  }

  // Call the A* algorithm function with start, end, and grid
  return aStarAlgorithm(start, end, grid);
}
