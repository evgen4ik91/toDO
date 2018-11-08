import React from 'react';
import CONST from '../../constants';
import {Resizer} from './resizer';
import { connect } from 'react-redux';
import { sidebarIsOpened } from '../../actions/sidebar';

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

    toggleSidebar(state) {
      let context = this;
      let opened = context.state.opened ? false : true;

      if (state !== undefined)  opened = state;
      
      context.setState({
        opened,
        transitionDuration: CONST.sidebarTransition
      },()=>{
        setTimeout(() => {
          context.setState({
            transitionDuration: 0
          });
        }, CONST.sidebarTransition)
      });
    }

    setSidebarWidth(width, currentWidth) {
      let condition = currentWidth > 50;
      if (condition) {
        this.setState({
          width
        });
        if (!this.state.opened) this.toggleSidebar(true);
      } else {
        if (this.state.opened) this.toggleSidebar(false);
      }
      
    }

    render() {
      let stylesSidebar = {
        width: this.state.width + 'px',
        transition: 'width ' + this.state.transitionDuration + 'ms ease-out'
      }
      let stylesSidebarWrapper = {
        width: this.state.width + 'px',
      }
      return  <div className={['sidebar', this.state.opened ? '' : 'closed'].join(' ')} style={stylesSidebar}>
                <div className="sidebar__wrapper" style={stylesSidebarWrapper}>
                  <button className="sidebar__tgl-btn bg-contain" onClick={()=>this.toggleSidebar()}></button>
                  <div className="sidebar__container">
                    {this.props.children}
                  </div>
                  <Resizer setSidebarWidth={this.setSidebarWidth} />
                </div>
              </div>
    }
}

const mapStateToProps = (state) => {
  return {
      sidebarIsOpened: state.sidebarIsOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sidebarIsOpened: (bool) => dispatch(sidebarIsOpened(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);