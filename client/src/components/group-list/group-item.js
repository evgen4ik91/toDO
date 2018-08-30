import React from 'react';
import ReactDOM from 'react-dom';

export class GroupItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: this.props.title,
          isEditing: this.props.isEditing,
          isCurrent: this.props.isCurrent
        },
        this.inputRef = React.createRef();
        this.setGroupAsCurrent = this.setGroupAsCurrent.bind(this),
        this.enterEditMode = this.enterEditMode.bind(this),
        this.setInputValue = this.setInputValue.bind(this),
        this.setFocusToInput = this.setFocusToInput.bind(this),
        this.keyHandler = this.keyHandler.bind(this),
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    setGroupAsCurrent(e) {
      const domNode = ReactDOM.findDOMNode(this);
      let isButton = e.target.classList.contains('group-list__item-btn');
      let isEditing = domNode.classList.contains('is-editing') && domNode.contains(e.target);

      if (!isButton && !isEditing) {
        this.props.setCurrentGroup(this.props.itemIndex);
      } else if (!isButton && isEditing) {
        this.setFocusToInput();
      }
    }

    enterEditMode(state) {
      this.props.setEditingGroup(state ? this.props.itemIndex : null);
    }

    keyHandler(e) {
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

    setInputValue(val) {
      this.setState({  
        title: val.length ? val : this.state.title
      });
    }

    setFocusToInput() {
      this.inputRef.current.focus();
    }

    componentWillReceiveProps(nextProps) {
      let isEditing = nextProps.isEditing;
      if (isEditing !== this.state.isEditing)  {
        if (!isEditing) {
          this.setInputValue(this.inputRef.current.value);
        }
      }
    }

    componentWillUpdate(nextProps) {
      let isCurrent = nextProps.isCurrent;
      let isEditing = nextProps.isEditing;
      if ((isCurrent !== this.state.isCurrent)||(isEditing !== this.state.isEditing))  {
        this.setState({
          isEditing,
          isCurrent
        },()=>{
          if (isEditing) {
            document.addEventListener('click', this.handleClickOutside, false);
            this.setFocusToInput();
          } else {
            document.removeEventListener('click', this.handleClickOutside, false);
          }
        });
      }
    }

    render() {
      let isEditing = this.state.isEditing;
      let isCurrent = this.state.isCurrent;
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
      return (<div className={['group-list__item', isEditing ? 'is-editing' : '', isCurrent ? 'is-current' : '' ].join(' ')} onClick={this.setGroupAsCurrent}>
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