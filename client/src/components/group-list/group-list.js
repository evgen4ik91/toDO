import React from 'react';
import {GroupItem} from './group-item';

export class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentItemIndex: 0,
          itemEditingIndex: null
        },
        this.setCurrentGroup = this.setCurrentGroup.bind(this),
        this.setEditingGroup = this.setEditingGroup.bind(this)
    }

    setCurrentGroup(i) {
      this.setState({
        currentItemIndex: i
      });
    }

    setEditingGroup(i) {
      this.setState({
        itemEditingIndex: i
      });
    }

    render() {
      let groupsRender;
      let groups = this.props.groupsList;
      if ((groups !== undefined)&&(groups.length)) {
        groupsRender = groups.map((title,i)=>{
          return <GroupItem  
                  title={title}
                  key={i}
                  itemIndex={i}
                  isCurrent={i === this.state.currentItemIndex}
                  isEditing={i === this.state.itemEditingIndex}
                  setCurrentGroup={this.setCurrentGroup} 
                  setEditingGroup={this.setEditingGroup}
                  />
        })
      } else {
        groupsRender = <p className="group-list__empty-msg">No groups</p>
      }
      return (
              <div className="group-list">
                <p className="group-list__title bright-title">GROUPS</p>
                <div className="group-list__container">
                  {groupsRender}
                </div>
                <button className="group-list__add-btn">Add new</button>
              </div>
              )
    }
}