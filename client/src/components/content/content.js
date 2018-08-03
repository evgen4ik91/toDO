import React from 'react';

export class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return  (<div className="content col">
                  {this.props.children}
                </div>)
    }
}