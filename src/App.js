import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Graph Algorithm Simulator</h1>
        <div className="overview flex-container">
          <div className="overview-item flex-item--full">
            <h2>Control Panel</h2>
            <div>
              <select>
                <option>DFS</option>
                <option>BFS</option>
              </select>
              <input type="button" value="next" />
            </div>
          </div>
          <div className="overview-item flex-item--half">
            <h2>Algorithm</h2>
            <div className="code-block">
              <code>public static void main()</code>
              <code className="debug-pointer">  int i = 43;</code>
              <code>  return i;</code>
              <code></code>
            </div>
          </div>
          <div className="overview-item flex-item--half">
            <h2>Graph</h2>
            <div id="graph"></div>
          </div>
          <div className="overview-item flex-item--full">
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
