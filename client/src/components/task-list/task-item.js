import React from 'react';
import ReactDOM from 'react-dom';

export class TaskItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        title: this.props.title,
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
          title: this.inputRef.current.value
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
      text = <input 
                className="group-list__item-input"
                type="text"
                defaultValue={this.state.title}
                onKeyPress={this.keyHandler}
                ref={this.inputRef}
              />;
    } else {
      text = <span 
              className="group-list__item-title"
              onDoubleClick={()=>this.enterEditMode(true)}
            >
              {this.state.title}
            </span>;
    };
    return (<div className={['group-list__item', isEditing ? 'is-editing' : '' ].join(' ')}>
              {text}
              <button
                className="group-list__item-btn edit bg-contain"
                title="Edit group"
                onClick={()=>this.enterEditMode(isEditing ? false : true)}
              ></button>
              <button
                className="group-list__item-btn remove bg-contain"
                title="Remove group"
              ></button>
            </div>)
  }
}