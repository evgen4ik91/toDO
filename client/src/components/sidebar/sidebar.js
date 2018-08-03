import React from 'react';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return  <div className="sidebar col">
                {this.props.children}
              </div>
    }
}