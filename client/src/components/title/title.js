import React from 'react';

export class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return  (<div className="title">
                <img className="title__logo" src="/images/logo.png" alt={this.props.title} />
              </div>)
    }
}