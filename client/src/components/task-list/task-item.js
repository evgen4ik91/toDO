import React from 'react';
import ReactDOM from 'react-dom';

export class TaskItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        text: this.props.text,
        date: this.props.date,
        isEditing: this.props.isEditing,
        isDeleting: false
      },
      this.inputRef = React.createRef();
      this.enterEditMode = this.enterEditMode.bind(this),
      this.keyHandler = this.keyHandler.bind(this),
      this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  enterEditMode (state) {
    this.props.setEditingTask(state ? this.props.itemIndex : null);
  }

  keyHandler (e) {
    if (e.key === 'Enter') {
      this.enterEditMode(false);
    }
  }

  handleClickOutside(e) {
    const domNode = ReactDOM.findDOMNode(this);

    if ((!domNode || !domNode.contains(e.target))) {
      this.enterEditMode(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    let isEditing = nextProps.isEditing;
    if (isEditing !== this.state.isEditing)  {
      if (!isEditing) {
        this.setState({  
          text: this.inputRef.current.value
        });
      }
    }
  }

  componentWillUpdate(nextProps) {
    let isEditing = nextProps.isEditing;
    if (isEditing !== this.state.isEditing) {
      this.setState({
        isEditing
      },()=>{
        if (isEditing) {
          document.addEventListener('click', this.handleClickOutside, false);
          this.inputRef.current.focus();
        } else {
          document.removeEventListener('click', this.handleClickOutside, false);
        }
      });
    }
  }

  render() {
    let isEditing = this.state.isEditing;
    let text;
    if (isEditing) {
      text = <textarea 
                className="task-list__item-input"
                type="text"
                defaultValue={this.state.text}
                onKeyPress={this.keyHandler}
                ref={this.inputRef}
              ></textarea>;
    } else {
      text = <span 
              className="task-list__item-text"
              onDoubleClick={()=>this.enterEditMode(true)}
            >
              {this.state.text}
            </span>;
    };
    return (<div className={['task-list__item', isEditing ? 'is-editing' : '' ].join(' ')}>
              <div className="row task-list__item-row">
                <div className="col task-list__item-text-col">
                  {text}
                </div>
                <div className="col task-list__item-done-col">
                  <button
                    className="task-list__item-done"
                    onClick={()=>this.enterEditMode(isEditing ? false : true)}
                  ></button>
                </div>
              </div>
              <div className="task-list__item-info">
                <p className="task-list__item-date">{this.state.date}</p>
                <div className="task-list__item-btn-container">
                  <button
                    className="task-list__item-btn edit bg-contain"
                    title="Edit task"
                    onClick={()=>this.enterEditMode(isEditing ? false : true)}
                  ></button>
                  <button
                    className="task-list__item-btn remove bg-contain"
                    title="Remove task"
                  ></button>
                </div>
              </div>
            </div>)
  }
}