import React, {Component} from 'react';
import {StyleSheet, Alert, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {nextGeneration, startGeneration, reset, clearGrid} from './store'

export class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {running: false};
  }

  render() {
    const start = () => {
      this.setState({running: true});
      this.props.startGeneration(false);
      this.interval = setInterval(this.props.startGeneration, 100);
    };

    const stop = () => {
      this.setState({running: false});
      clearInterval(this.interval);
    };

    const reset = () => {
      this.props.clearGrid(true);
    };

    return <View style={styles.container}>
      {this.state.running ? (
        <Button
          onPress={stop}
          title="Stop"
        />
      ) : (
        <Button
          onPress={start}
          title="Start"
        />
      )}

      <Button
        onPress={reset}
        title="Reset"
      />
    </View>;
  }
}

const mapStateToProps = (store) => {
  return {
    iterations: store.iterations,
    stable: store.stable
  }
};
const actions = {nextGeneration, startGeneration, reset, clearGrid};

export default connect(mapStateToProps, actions)(Controls);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'flex-end'
  },
  text: {
    color: '#000'
  }
});