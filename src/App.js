/*
 * @Author: Dong
 * @Date: 2019-11-06 17:35:04
 * @LastEditors: Dong
 * @LastEditTime: 2021-01-11 16:30:36
 */
import React, { Component } from 'react';
import DragItem from './DragItem';
import './App.less';
import DragProvider from './DragProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          color: 'red'
        },
        {
          color: 'green'
        },
        {
          color: 'blue',
          draggable: false
        },
        {
          color: 'yellow'
        },
        {
          color: 'orange'
        },
        {
          color: 'black'
        }
      ]
    };
  }

  handleChange = (dragIndex, dropIndex) => {
    console.log(dragIndex, dropIndex);
    const { data } = this.state;
    data.splice(dropIndex, 0, data.splice(dragIndex, 1)[0]);
    this.setState({
      data
    });
  }

  render() {
    const listItems = this.state.data.map((item, i) => {
      return (
        <DragItem
          key={i}
          index={i}
          draggable={item.draggable}
        >
          <div
            style={{
              width: '100%',
              height: 30,
              border: '1px solid #ddd'
            }}
          >
            {item.color}
          </div>
        </DragItem>
      );
    });
    return (
      <DragProvider
        className="contain"
        onChange={this.handleChange}
      >
        {listItems}
      </DragProvider>
    );
  }
}

export default App;
