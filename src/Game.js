import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from './Grid'
import Controls from './Controls'
import {StyleSheet, View} from 'react-native';

export class Game extends Component {

  render() {
    const {grid} = this.props;

    return <View style={styles.container}>
      <Controls/>
      <View style={styles.game}>
        <Grid cells={grid.cells}/>
      </View>
    </View>;
  }
}

const mapStateToProps = (store) => {
  return {
    grid: store.grid,
  }
};
export default connect(mapStateToProps)(Game);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  game: {
    flex: 6
  }
});