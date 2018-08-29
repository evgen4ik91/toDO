import React from 'react';

export class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          itemEditingIndex: null
        }
    }

    render() {
      return (<div className="task-list">
              </div>)
    }
}