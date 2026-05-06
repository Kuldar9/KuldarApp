import React, { Component, createContext } from 'react';
import Developer from './developer'; /* highest logging level for debugging with console UI popup window available
                                                   (press "A+B+C" simultaneously to open console window) */

class ErrorBoundary extends Component {
  constructor(props) {
    console.log('class ErrorBoundary, file: errorBoundary.js');
    super(props);
    // Set a default value if errorMode is not provided or invalid
    const validModes = ['normal', 'developer'];
    this.state = { errorMode: validModes.includes(props.errorMode) ? props.errorMode : 'normal' };
  }

  render() {
    console.log('previous done, loading view, file: errorBoundary.js');
    switch (this.state.errorMode) {
      case 'normal':
        return console.log('normal');
      case 'developer':
        return <Developer />;
      default:
        return console.log('normal');
    }
  }
}

export default ErrorBoundary;