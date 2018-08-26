import React, { Component } from 'react'
import 'antd/dist/antd.css'
import TodoListUI from './TodoListUI'
import store from './store'
import { getTodoList, getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

// 容器组件
class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    store.subscribe(this.handleStoreChange)
  }

  componentDidMount () {
    const action = getTodoList()
    store.dispatch(action)
  }

  handleInputChange (e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }

  handleBtnClick () {
    const action = getAddItemAction()
    store.dispatch(action)
  }

  handleStoreChange () {
    this.setState(store.getState())
  }

  handleItemDelete (index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }

  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }

}

export default TodoList
