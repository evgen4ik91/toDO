import React from 'react';
import CONST from '../../constants';
import {Resizer} from './resizer';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: true,
            width: CONST.defaultSidebarWidth,
            transitionDuration: 0
        }
        this.toggleSidebar = this.toggleSidebar.bind(this),
        this.setSidebarWidth = this.setSidebarWidth.bind(this)
    }

    toggleSidebar () {
      let context = this;
      context.setState({
        opened: context.state.opened ? false : true,
        transitionDuration: CONST.sidebarTranstion
      },()=>{
        setTimeout(() => {
          context.setState({
            transitionDuration: 0
          });
        }, CONST.sidebarTranstion)
      });
    }

    setSidebarWidth (width) {
      this.setState({
        width
      });
    }

    render() {
      let styles = {
        width: this.state.width + 'px',
        transition: 'width ' + this.state.transitionDuration + 'ms ease-out'
      }
      return  <div className={['sidebar', this.state.opened ? '' : 'closed'].join(' ')} style={styles}>
                <button className="sidebar__tgl-btn bg-contain" onClick={this.toggleSidebar}></button>
                <div className="sidebar__container" style={styles}>
                  {this.props.children}
                </div>
                <Resizer setSidebarWidth={this.setSidebarWidth} />
              </div>
    }
}