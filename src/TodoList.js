import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import TodoListUI from './TodoListUI'
import { getTodoList, getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

// 容器组件
class TodoList extends Component {
  componentDidMount () {
    this.props.initTodoList()
  }

  render() {
    const { inputValue, list, changeInputValue, addItem, deleteItem } = this.props
    return (
      <TodoListUI
        inputValue={inputValue}
        list={list}
        handleInputChange={changeInputValue}
        handleBtnClick={addItem}
        handleItemDelete={deleteItem}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue (e) {
      dispatch(getInputChangeAction(e.target.value))
    },
    addItem () {
      dispatch(getAddItemAction())
    },
    deleteItem (index) {
      dispatch(getDeleteItemAction(index))
    },
    initTodoList () {
      dispatch(getTodoList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
