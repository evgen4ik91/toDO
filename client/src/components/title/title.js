import React from 'react';

export class Title extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return  (<div className="title">
                <h1>{this.props.appName}</h1>
              </div>)
    }
}