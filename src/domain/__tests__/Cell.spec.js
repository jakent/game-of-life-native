import Cell from '../Cell';

describe('Cell', () => {

  it('should be ALIVE or DEAD', () => {
    expect(new Cell(false).alive).toEqual(false);
    expect(new Cell(true).alive).toEqual(true);
  });

  it('switch from DEAD to ALIVE if its surrounded exactly by 3 living cells', () => {
    expect(new Cell(false).transform(3).alive).toEqual(true);
  });

  it('remain alive if its surrounded by 2 or 3 living cells', () => {
    expect(new Cell(true).transform(3).alive).toEqual(true);
    expect(new Cell(true).transform(2).alive).toEqual(true);
  });

  it('switch from being ALIVE to DEAD if its surrounded by more than 3 living cells because of over population', () => {
    expect(new Cell(true).transform(4).alive).toEqual(false);
    expect(new Cell(true).transform(5).alive).toEqual(false);
  });

  it('switch from being ALIVE to DEAD if its surrounded by less than 2 cells because of under population', () => {
    expect(new Cell(true).transform(1).alive).toEqual(false);
  });

  it('know his/her neighborhood', () => {
    const cell = new Cell(false, {x: 1, y: 1});

    expect(cell.isNear({x: 1,y: 1})).toEqual(false);
    expect(cell.isNear({x: 0,y: 0})).toEqual(true);
    expect(cell.isNear({x: 1,y: 0})).toEqual(true);
    expect(cell.isNear({x: 2,y: 0})).toEqual(true);
    expect(cell.isNear({x: 2,y: 1})).toEqual(true);
    expect(cell.isNear({x: 2,y: 2})).toEqual(true);
    expect(cell.isNear({x: 1,y: 2})).toEqual(true);
    expect(cell.isNear({x: 0,y: 2})).toEqual(true);
    expect(cell.isNear({x: 0,y: 1})).toEqual(true);
    expect(cell.isNear({x: 1,y: 3})).toEqual(false);
  });

  it('should start with ZERO generations alive if initialized to DEAD', () => {
    expect(new Cell(false).generationsAlive).toEqual(0);
  });

  it('should start with ONE generations alive if initialized to ALIVE', () => {
    expect(new Cell(true).generationsAlive).toEqual(1);
  });

});
