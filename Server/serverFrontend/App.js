// App.js
import React, { Component } from 'react';
import { View } from 'react-native';
import ScreenNavigator from './src/components/navigation/screenNavigator';
import ErrorBoundary from './src/components/utils/errorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <View style={{ flex: 1 }}>
          <ScreenNavigator />
        </View>
      </ErrorBoundary>
    );
  }
}

export default App;