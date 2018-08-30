import React from 'react';
import {GroupItem} from './group-item';

export class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          itemEditingIndex: null
        },
        this.setEditingGroup = this.setEditingGroup.bind(this)
    }

    setEditingGroup(i) {
      this.setState({
        itemEditingIndex: i
      });
    }

    render() {
      return (
              <div className="group-list">
                <p className="group-list__title bright-title">GROUPS</p>
                <div className="group-list__container">
                  {
                    this.props.groupsList.map((title,i)=>{
                      return <GroupItem  
                              title={title}
                              key={i}
                              itemIndex={i}
                              isEditing={i === this.state.itemEditingIndex}
                              setEditingGroup={this.setEditingGroup} 
                              />
                    })
                  }
                </div>
                <button className="group-list__add-btn">Add new</button>
              </div>
              )
    }
}