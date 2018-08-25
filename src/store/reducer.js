import * as types from './type'

const defaultState = {
  inputValue: '123',
  list: [1, 2, 3]
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_INPUT_VALUE:
      return { ...state, inputValue: action.value }
    case types.ADD_TODO_ITEM:
      const list = [...state.list, state.inputValue]
      return { ...state, list, inputValue: '' }
    default:
      return state
  }
}
