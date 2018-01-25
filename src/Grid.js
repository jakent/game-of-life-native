import React, {Component} from 'react';
import Cell from './Cell'
import {StyleSheet, Text, View} from 'react-native';


class Grid extends Component {
  render() {
    const {cells} = this.props;

    return <View style={styles.grid}>
      <View style={styles.centered}>
        {cells.map((row, y) =>
          <View style={styles.row} key={y}>
            {row.map((cell, x) =>
              <Cell key={`x${x}-y${y}`}
                    alive={cell.alive}
              />
            )}
          </View>
        )}
      </View>
    </View>;
  }
}

// Grid.defaultProps = {
//   cells: [
//     [{alive: false}, {alive: false}, {alive: false}, {alive: false}, {alive: false}],
//     [{alive: false}, {alive: false}, {alive: true}, {alive: false}, {alive: false}],
//     [{alive: false}, {alive: false}, {alive: true}, {alive: false}, {alive: false}],
//     [{alive: false}, {alive: false}, {alive: true}, {alive: false}, {alive: false}],
//     [{alive: false}, {alive: false}, {alive: false}, {alive: false}, {alive: false}]
//   ]
// };

export default Grid;

const styles = StyleSheet.create({
  grid: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {},
  row: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});