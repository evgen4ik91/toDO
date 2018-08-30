import React from 'react';
import CONST from '../../constants';
import {horizontMoveMode} from '../../handlers';

export class Resizer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          currentWidth: CONST.defaultSidebarWidth,
          isPressed: false
      },
      this.mouseDownHandler = this.mouseDownHandler.bind(this),
      this.mouseMoveHandler = this.mouseMoveHandler.bind(this),
      this.mouseUpHandler = this.mouseUpHandler.bind(this)
  }

  mouseDownHandler() {
    this.setState({
      isPressed: true
    },()=>{
      horizontMoveMode(true);
      window.addEventListener('mousemove', this.mouseMoveHandler);
      window.addEventListener('mouseup', this.mouseUpHandler);
    })
  }

  mouseUpHandler(e) {
    this.setState({
      isPressed: false
    },()=>{
      horizontMoveMode(false);
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      window.removeEventListener('mouseup', this.mouseUpHandler);
    });
  }
 
  mouseMoveHandler(e) {
    let minWidth = CONST.minSidebarWidth
    let currentWidth = e.clientX + 3;
    let width = currentWidth < minWidth ? minWidth : currentWidth;
    this.props.setSidebarWidth(width, currentWidth);
  }

  render() {
    return  <div 
                className={['sidebar__resizer', this.state.isPressed ? 'pressed' : ''].join(' ')} 
                onMouseDown={this.mouseDownHandler}
            ></div>
  }
}