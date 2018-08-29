import React from 'react';

export class GroupItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: this.props.title,
          isEditing: this.props.isEditing,
          isDeleting: false
        },
        this.inputRef = React.createRef();
        this.enterEditMode = this.enterEditMode.bind(this),
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillReceiveProps() {
      if (this.props.isEditing !== this.state.isEditing) {
        let isEditing = this.props.isEditing;
        this.setState({
          isEditing
        },()=>{
          if (isEditing) this.inputRef.current.focus();
        });
      }
    }

    enterEditMode (state) {
      this.props.setEditing(state ? this.props.itemIndex : null);
    }

    keyHandler (e) {
      if (e.key === 'Enter') {
        this.enterEditMode(false);
        this.setState({
          title: e.target.value
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