export function createGrid(width, height) {
  let grid = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, f: 0, g: 0, h: 0, previous: undefined, wall: false });
    }
    grid.push(row);
  }
  return grid;
}
