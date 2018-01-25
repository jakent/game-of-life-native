import {createStore} from 'redux';
import Grid from '../domain/Grid'

export const changeCellState = (data) => ({type: 'CHANGE_CELL_STATE', data});
export const nextGeneration = () => ({type: 'NEXT_GENERATION'});
export const startGeneration = () => ({type: 'START_GENERATION'});
export const reset = (data) => ({type: 'RESET', data});
export const changeGridSize = (data) => ({type: 'CHANGE_GRID_SIZE', data});
export const clearGrid = (random) => ({type: 'CLEAR_GRID', random});

const size = 15;

export const defaultState = {
  grid: Grid.createRandom(size, size),
  history: [Grid.createEmpty(size, size).exportData()],
  iterations: 0,
  stable: false
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_GRID_SIZE': {
      //add test about resetting iterations
      const newGrid = Grid.createEmpty(action.data.width, action.data.height);
      return Object.assign({}, state, {grid: newGrid, history: [newGrid.exportData()]});
    }
    case 'CLEAR_GRID': {
      //add test about resetting iterations
      const newGrid = action.random ? Grid.createRandom(size, size) : Grid.createEmpty(size, size);
      return Object.assign({}, state, {grid: newGrid, history: [newGrid.exportData()], iterations: 0});
    }
    case 'CHANGE_CELL_STATE': {
      //add test about resetting history, setting stable
      const updatedGrid = state.grid.updateCell(action.data.position, action.data.alive);
      return Object.assign({}, state, {grid: updatedGrid, history: [updatedGrid.exportData()], stable: false});
    }
    case 'START_GENERATION':
    case 'NEXT_GENERATION': {
      const nextGeneration = state.grid.nextGeneration(true);
      const nextGenerationData = nextGeneration.exportData();

      const newHistory = state.history.slice();
      newHistory.push(nextGenerationData);

      const stable = repeated(nextGenerationData, state.history);

      return Object.assign({}, state, {
        grid: nextGeneration,
        iterations: state.iterations + 1,
        stable: stable,
        history: newHistory
      });
    }
    case 'RESET':
      return Object.assign({}, state, { grid: new Grid(action.data), iterations: 0, stable: false });
    default:
      return state;
  }
};

const repeated = (next, history) =>
  history
    .map((i) => JSON.stringify(i) === JSON.stringify(next))
    .filter((i) => i)
    .length >= 1;

export const store = createStore(reducer);

