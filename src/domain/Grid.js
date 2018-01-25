import Cell from './Cell';

export default class Grid {
  constructor(cells) {
    this.cells = cells;
  }

  findLivingNeighbors({x, y}) {
    let livingNeighbors = 0;

    const startX = (x-1 < 0) ? x : x-1;
    const startY = (y-1 < 0) ? y : y-1;
    const endX = (x+1 > this.cells[0].length-1) ? x : x+1;
    const endY = (y+1 > this.cells.length-1) ? y : y+1;

    for (let row = startY; row <= endY; row++) {
      for (let column = startX; column <= endX; column++) {
        if (column === x && row === y) {
          continue;
        }
        livingNeighbors += this.cells[row][column].alive ? 1 : 0;
      }
    }
    return livingNeighbors;
  }

  findToroidalNeighbors({x, y}) {
    let livingNeighbors = 0;

    let xMax = this.cells[0].length;
    let yMax = this.cells.length;
    const startX = (x-1 < 0) ? xMax - 1 : x-1;
    const startY = (y-1 < 0) ? yMax - 1 : y-1;

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        let neighborX = (startX + column) % xMax;
        let neighborY = (startY + row) % yMax;

        if (neighborX === x && neighborY === y) {
          continue;
        }
        livingNeighbors += this.cells[neighborY][neighborX].alive ? 1 : 0;
      }
    }

    return livingNeighbors;
  }

  nextGeneration(toroidal = false) {
    const neighborFunction = (pos) => toroidal ? this.findToroidalNeighbors(pos) : this.findLivingNeighbors(pos);

    return new Grid(
      this.cells.map((row) => {
        return row.map((cell) => {
          return cell.transform(neighborFunction(cell.position));
        })
      })
    )
  }

  updateCell(position, alive) {
    const newGrid = new Grid(this.cells);
    let changingCell = newGrid.cells[position.y][position.x];
    changingCell.alive = alive;
    changingCell.generationsAlive += 1;
    return newGrid;
  }

  exportData() {
    return this.cells.map((row) => {
      return row.map((cell) => {
        return cell.alive;
      })
    })
  }

  static  createEmpty(x, y, random = false) {
    return new Grid(
      new Array(x).fill(undefined).map((row, yi) => {
        return new Array(y).fill(undefined).map((column, xi) => {
          const alive = random ? Math.floor(Math.random() * 10) % 2 === 0: false;
          return new Cell(alive, {x: xi, y: yi})
        })
      })
    )
  }

  static createRandom(x, y) {
    return Grid.createEmpty(x, y, true);
  }

  static from(preset) {
    return new Grid(
      preset.map((row) => {
        return row.map((cell) => {
          return Object.assign(new Cell, cell);
        })
      })
    )
  }
}