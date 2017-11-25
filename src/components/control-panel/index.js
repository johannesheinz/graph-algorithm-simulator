import React, { Component } from 'react';


class ControlPanel extends Component {
    render() {
        return (
            <div>
              <h2>Control Panel</h2>
              <div>
                <select>
                  <option>DFS</option>
                  <option>BFS</option>
                </select>
                <input type="button" value="before" />
                <input type="button" value="next" />
              </div>
            </div>
        );
    }
}

export default ControlPanel;