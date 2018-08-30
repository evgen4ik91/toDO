import React from 'react';
import {TaskItem} from './task-item'

export class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          itemEditingIndex: null
        }
    }
    
    setEditingTask(i) {
      this.setState({
        itemEditingIndex: i
      });
    }

    render() {
      let tasks = this.props.taskList
      let tasksRender;
      if (tasks !== undefined) {
        tasksRender = Object.keys(tasks).map((key,i)=>{
          let item = tasks[key];
          return <TaskItem  
                  text={item.text}
                  date={item.date}
                  key={i}
                  itemIndex={i}
                  isEditing={i === this.state.itemEditingIndex}
                  setEditingTask={this.setEditingTask} 
                  />
        })
      } else {
        tasksRender = <p className="task-list__empty-msg">No tasks</p>
      }

      return (<div className="task-list">
                <div className="task-list__container">
                  {tasksRender}
                </div>
              </div>)
    }
}