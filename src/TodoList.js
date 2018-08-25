import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'
import * as types from './store/type'

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    store.subscribe(this.handleStoreChange)
  }

  handleInputChange (e) {
    const action = {
      type: types.CHANGE_INPUT_VALUE,
      value: e.target.value
    }
    console.log(action)
    store.dispatch(action)
  }

  handleBtnClick () {
    const action = {
      type: types.ADD_TODO_ITEM
    }
    store.dispatch(action)
  }

  handleStoreChange () {
    this.setState(store.getState())
  }

  render() {
    return (
      <div style={{marginTop: '10px', marginLeft: '10px'}}>
        <div>
          <Input onChange={this.handleInputChange} value={this.state.inputValue} placeholder='todo info' style={{width: '300px', marginRight: '10px'}}></Input>
          <Button type='primary' onClick={this.handleBtnClick}>提交</Button>
        </div>
        <List
          style={{marginTop: '10px', width: '300px'}}
          bordered
          dataSource={this.state.list}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
    )
  }

}

export default TodoList
