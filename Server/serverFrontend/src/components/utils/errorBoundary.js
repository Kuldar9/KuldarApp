// errorBoundary.js
import React, { Component } from 'react';
import ErrorScreen from '../../screens/errorScreen';

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
    showErrorInfo: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  dismissError = () => {
    this.setState({ error: null, errorInfo: null });
  };

  toggleErrorInfo = () => {
    this.setState((prevState) => ({
      showErrorInfo: !prevState.showErrorInfo,
    }));
  };

  render() {
    const { error, errorInfo, showErrorInfo } = this.state;

    if (error) {
      return (
        <ErrorScreen
          error={error}
          errorInfo={errorInfo}
          onDismiss={this.dismissError}
          showErrorInfo={showErrorInfo}
          onToggleErrorInfo={this.toggleErrorInfo}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;