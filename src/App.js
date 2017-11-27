import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAlgorithm: '',
      logs: [],
      currentLogLine: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.next = this.next.bind(this);
    this.before = this.before.bind(this);
  }

  handleChange(event) {
    this.setState({selectedAlgorithm: event.target.value});
  }

  handleSubmit(event) {
    console.log('Run ' + this.state.selectedAlgorithm);

    var nodes = ['a', 'b', 'c']
    var neighbors = {};
    neighbors['a'] = ['b', 'c'];
    neighbors['b'] = ['c'];
    neighbors['c'] = ['b']

    const graph = {
      nodes: nodes,
      edges: neighbors
    };

    this.setState((prevState, props) => {
      const logs = executeAlgorithm("bfs", graph, 'a');
      return ({
        logs: []
      }); 
    });

    event.preventDefault();
  }
  
  next() {
    this.setState((prevState, props) => ({
      selectedAlgorithm: prevState.selectedAlgorithm,
      currentDebugLine: prevState.currentDebugLine + 1
    }));
  }

  before() {
    this.setState((prevState, props) => ({
      selectedAlgorithm: prevState.selectedAlgorithm,
      currentDebugLine: prevState.logs[currentLogLine + 1] - 1
    }));
  }

  render() {
    const data = Data();
    const algorithm = data.algorithms[0];
    const codeLines = algorithm.code.map((codeLine) => {
      var codeLineStyle = 'code-block-line';
      if (codeLine.number === this.state.currentDebugLine)  {
        codeLineStyle += ' debug-pointer';
      }
      return (
        <div key={codeLine.number.toString()} className={codeLineStyle}>
          <div className="line-number">{codeLine.number}.</div>
          <div className="line-content" style={{ paddingLeft: `${codeLine.padding}em`}}>
            {codeLine.content}
          </div>
        </div>
      );
    });
    return (
      <div className="App">
        <h1>Graph Algorithm Simulator</h1>
        <div className="overview flex-container">
          <div className="overview-item flex-item--full">
            <h2>Control Panel</h2>
            <div>
              <select value={this.state.selectedAlgorithm} onChange={this.handleChange}>  
                <option value="default">Choose</option>
                <option value="dfs">DFS</option>
                <option value="bfs">BFS</option>
              </select>
              <button onClick={this.handleSubmit}>Run!</button>
              <button onClick={this.before}>Before</button>
              <button onClick={this.next}>Next</button>
            </div>
          </div>
          <div className="overview-item flex-item--half">
            <h2>Algorithm</h2>
            <div className="code-block">
              {codeLines}
            </div>
          </div>
          <div className="overview-item flex-item--half">
            <h2>Graph</h2>
            <div id="graph"></div>
          </div>
          <div className="overview-item flex-item--full">
            <h2>Logs</h2>
            <ol>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

function Data() {
  return {
    algorithms: [
      {
        name: 'BFS', 
        code: [
          { number: 1, padding: 0, content: 'Push(Q, s);' },
          { number: 2, padding: 0, content: 'Markiere s;' },
          { number: 3, padding: 0, content: 'N[s] := Menge l_s aller Nachfolgerknoten von s;' },
          { number: 4, padding: 0, content: 'u := 1;' },
          { number: 5, padding: 0, content: 'd[s] := u;' },
          { number: 6, padding: 0, content: 'while not Stack-empty(Q) do {' },
          { number: 7, padding: 1, content: 'v := top(Q);' },
          { number: 8, padding: 1, content: 'if N[v] != 0 then {' },
          { number: 9, padding: 2, content: 'Wähle v\' in N[v];' },
          { number: 10, padding: 2, content: 'N[v] := N[v] \ {v\'};' },
          { number: 11, padding: 2, content: 'if (v\' ist noch nicht markiert) then {' },
          { number: 12, padding: 3, content: 'Push(Q, v\');' },
          { number: 13, padding: 3, content: 'Markiere v\';' },
          { number: 14, padding: 3, content: 'N[v\'] := Menge l_v\' aller Nachfolgerknoten von v\';' },
          { number: 15, padding: 3, content: 'u := u + 1;' },
          { number: 16, padding: 3, content: 'd[v\'] := u;' },
          { number: 17, padding: 2, content: '}' },
          { number: 18, padding: 1, content: '} else {' },
          { number: 19, padding: 2, content: 'Pop(Q);' },
          { number: 20, padding: 2, content: 'u := u + 1;' },
          { number: 21, padding: 2, content: 'f[v] := u;' },
          { number: 22, padding: 1, content: '}' },
          { number: 23, padding: 0, content: '}' }
        ]
      }
    ]
  }
}

function executeAlgorithm(algorithm, graph, startNode) {
  var logs = [];
  if (algorithm === 'bfs') {
    logs = bfs(graph.nodes, graph.edges, startNode);
  }
  console.log('Computed logs with length ' + logs.length);
  return logs;
}

function bfs(nodes, edges, startNode) {
  var logs = [];
  var d = {};
  var Q = [];

  logs.push({
    id: 0,
    line: 1,
    state: `Q = ${Q}, d = ${d}`
  });

  d[startNode] = 0;
  Q = [startNode];

  logs.push({
    id: logs[logs.length -1].id + 1,
    state: `Q = ${Q}, d = ${d}`,
    line: 6
  });

  while (Q.length !== 0) {
    var currentNode = Q[0];
    if (edges[currentNode].length !== 0) {
      var nextNode = edges[currentNode][0];
      if (d[nextNode] === undefined) {
        d[nextNode] = d[currentNode] + 1;
        Q.push(nextNode);
      } else {
        edges[currentNode].splice(0,1);
      }
    } else {
      Q.splice(0, 1);
    }

    logs.push({
      id: logs[logs.length -1].id + 1,
      line: 22,
      state: `Q = ${Q}, d = ${d}`
    });

  }

  return logs;
}



export default App;
