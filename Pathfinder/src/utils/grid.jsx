export function createGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push({ x: i, y: j, f: 0, g: 0, h: 0, previous: undefined, wall: false });
    }
    grid.push(row);
  }
  return grid;
}
