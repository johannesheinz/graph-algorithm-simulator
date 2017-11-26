import React, { Component } from 'react';
import './App.css';

class App extends Component {

  bfs() {
    var nodes = ['a', 'b', 'c']
    var neighbors = {};
    neighbors['a'] = ['b', 'c'];
    neighbors['b'] = ['c'];
    neighbors['c'] = ['b']
    var d = {}
    d['a'] = 0;
    var Q = ['a'];

    while (Q.length !== 0) {
      var currentNode = Q[0];
      if (neighbors[currentNode].length !== 0) {
        var neighbor = neighbors[currentNode][0];
        if (d[neighbor] === undefined) {
          d[neighbor] = d[currentNode] + 1;
          Q.push(neighbor);
        } else {
          neighbors[currentNode].splice(0,1);
        }
      } else {
        Q.splice(0, 1);
      }
    }

    console.log(d);
  }

  render() {
    return (
      <div className="App">
        <h1>Graph Algorithm Simulator</h1>
        <div className="overview flex-container">
          <div className="overview-item flex-item--full">
            <h2>Control Panel</h2>
            <div>
              <button onClick={this.bfs}>
                BFS
              </button>
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
