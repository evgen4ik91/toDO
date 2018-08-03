import React from 'react';
import {GroupItem} from './group-item';

export class GroupList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount (){
      
    }


    render() {
      return (<div className="group-list">
                <p className="group-list__title bright-title">GROUPS</p>
                <div className="group-list__container">
                  {
                    this.props.groupsList.map((title,i)=>{
                      return <GroupItem  title={title} key={i} />
                    })
                  }
                </div>
                <button className="group-list__add-btn">Add new</button>
              </div>)
    }
}