import React from 'react';
import CONST from '../../constants';

export class Resizer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          width: CONST.defaultSidebarWidth,
          isWatching: false
      }
  }

  mouseDownHandler() {

  }

  mouseUpHandler() {
    
  }

  render() {
    return  <div className={['sidebar__resizer', this.state.isWatching ? 'pressed' : ''].join(' ')}></div>
  }
}