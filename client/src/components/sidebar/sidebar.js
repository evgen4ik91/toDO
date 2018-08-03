import React from 'react';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: true
        }
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar () {
      this.setState({
        opened: this.state.opened ? false : true
      });
    }
    render() {
      return  <div className={['sidebar', this.state.opened ? 'opened' : ''].join(' ')}>
                <button className="sidebar__tgl-btn bg-contain" onClick={this.toggleSidebar}></button>
                <div className="sidebar__container">
                  {this.props.children}
                </div>
              </div>
    }
}