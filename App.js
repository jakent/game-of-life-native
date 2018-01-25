import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import {store} from './src/store'
import Game from './src/Game'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}
