/*
 * @Author: Dong
 * @Date: 2021-01-11 14:12:07
 * @LastEditors: Dong
 * @LastEditTime: 2021-01-11 16:10:01
 */
import React, { Component } from 'react';
import { Consumer } from './DragProvider.js';

class DragItem extends Component {
  render() {
    const { children, draggable, ...other } = this.props;
    return (
      <Consumer>
        {
          ({ dragStart, dragEnd }) => (
            <div
              {...other}
              className="drag-item"
              draggable={draggable !== undefined ? draggable : true}
              onDragEnd={dragEnd}
              onDragStart={dragStart}
            >
              {children}
            </div>
          )
        }
      </Consumer>

    );
  }
}

export default DragItem;
