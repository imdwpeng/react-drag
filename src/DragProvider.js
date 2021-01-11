/*
 * @Author: Dong
 * @Date: 2021-01-11 15:12:05
 * @LastEditors: Dong
 * @LastEditTime: 2021-01-11 16:23:53
 */
import React, { Component } from 'react';
import { parent } from './util';

export const { Provider, Consumer } = React.createContext();

class DragProvider extends Component {
  handleDragStart = (e) => {
    this.dragged = e.currentTarget;
  }

  // 拖拽结束
  handleDragEnd = (e) => {
    const { onChange } = this.props;

    if (!this.over) return;

    e.target.classList.remove('drag-up');
    e.target.classList.remove('drag-down');
    this.over.classList.remove('drag-up');
    this.over.classList.remove('drag-down');

    const dragIndex = Number(this.dragged.getAttribute('index'));
    const dropIndex = Number(this.over.getAttribute('index'));

    if (onChange) {
      onChange(dragIndex, dropIndex);
    }
  }

  handleDragOver = (e) => {
    e.preventDefault();

    // 获取目标项
    const target = parent(e.target, 'drag-item');

    if (!target || target.getAttribute('draggable') !== 'true') {
      if (this.over) {
        this.over.classList.remove('drag-up', 'drag-down');
      }
      this.over = undefined;

      return;
    }

    const dragIndex = Number(this.dragged.getAttribute('index'));
    const targetIndex = Number(target.getAttribute('index'));
    const animateName = dragIndex > targetIndex ? 'drag-up' : 'drag-down';

    if (this.over && targetIndex !== this.over.getAttribute('index')) {
      this.over.classList.remove('drag-up', 'drag-down');
    }

    if (!target.classList.contains(animateName)) {
      target.classList.add(animateName);
      this.over = target;
    }
  }

  handleDragLeave = () => {
    if (this.over) {
      this.over.classList.remove('drag-up', 'drag-down');
    }
    this.over = undefined;
  }

  render() {
    const { children, onChange, ...other } = this.props;
    return (
      <Provider
        value={{
          dragStart: this.handleDragStart,
          dragEnd: this.handleDragEnd
        }}
      >
        <div
          {...other}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
        >
          {children}
        </div>
      </Provider>
    );
  }
}

export default DragProvider;
