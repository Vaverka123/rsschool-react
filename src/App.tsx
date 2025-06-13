import { Component } from 'react';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Main from './components/main/Main';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );
  }
}

export default App;
