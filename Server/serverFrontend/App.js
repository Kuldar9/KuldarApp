import React from 'react';
import ErrorBoundary from './src/components/errorHandling/errorBoundary';
import ThemeProvider from './src/components/utils/themeProvider';

// configurations currently available
console.log('Loading view, file: App.js');
const App = () => (
    <ThemeProvider darkMode={true}>
      <ErrorBoundary errorMode={"developer"}/> {/* normal, developer */}
    </ThemeProvider>
);

export default App;