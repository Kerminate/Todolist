import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case INIT_LIST_ACTION:
      return { ...state, list: action.data }
    case CHANGE_INPUT_VALUE:
      return { ...state, inputValue: action.value }
    case ADD_TODO_ITEM:
      const list = [...state.list, state.inputValue]
      return { ...state, list, inputValue: '' }
    case DELETE_TODO_ITEM:
      const newState = JSON.parse(JSON.stringify(state))
      newState.list.splice(action.index, 1)
      return newState
    default:
      return state
  }
}
