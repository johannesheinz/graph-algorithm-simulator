import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import ControlPanel from '@components/control-panel'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Graph Algorithm Simulator</h1>
        <div class="overview flex-container">
          {/* <ControlPanel class="overview-item" /> */}
          <div class="overview-item flex-item--full"> 
            <h2>ControlPanel</h2>
          </div>
          <div class="overview-item flex-item--half">
            <h2>Algorithm</h2>
            <div class="code-block">
              <code>public static void main()</code>
              <code class="debug-pointer">  int i = 43;</code>
              <code>  return i;</code>
              <code></code>
            </div>
          </div>
          <div class="overview-item flex-item--half">
            <h2>Graph</h2>
            <div id="graph"></div>
          </div>
          <div class="overview-item flex-item--full">
            <h2>Logs</h2>
            <ol>
              <li>Log entry ...</li>
              <li>Something happend</li>
              <li>... terminated</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
