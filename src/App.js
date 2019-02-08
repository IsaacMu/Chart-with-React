import React, { Component } from 'react';
import './App.css';
import Chart from './Chart.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
        <div style={{ height: '80px' }}>
          <Chart />
        </div>
        {/*</header>*/}
      </div>
    );
  }
}

export default App;
