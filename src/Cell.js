import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeCellState} from './store'
import { Button, View, Alert } from 'react-native';

export class Cell extends Component {

  render() {
    const {alive, position, changeCellState, generationsAlive} = this.props;

    // return <View
    //   className="cell"
    //   onClick={() => changeCellState({alive: !alive, position: position})}>
    //   <View className={`cell__inner ${alive ? 'alive' : 'dead'}`} />
    // </View>;

    // const change = () => changeCellState({alive: !alive, position: position});
    const change = () => {
      Alert.alert("Hello world")
    };

    return <View style={styles(alive).cell} >
      {/*<Button*/}
        {/*onPress={change}*/}
        {/*title=''*/}
      {/*/>*/}
    </View>
  }
}

// const actions = {changeCellState};
// export default connect(null, actions)(Cell);

export default Cell;

const styles = (alive) => ({
  cell: {
    // position: 'relative',
    height: 20,
    width: 20,
    // flexGrow: 1,
    // flexShrink: 0,
    // flexBasis: 0,
    backgroundColor: alive ? '#000' : '#fff',
    borderColor: '#000',
    borderWidth: 1
  },
});