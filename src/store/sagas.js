import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import { initListAction } from './actionCreators'

function* getInitList () {
  try {
    const res = yield axios.get('/api/todolist')
    const action = initListAction(res.data)
    // put 相当于 dispatch
    yield put(action)
  } catch (e) {
    console.log('/api/todolist 网络请求失败')
  }
}

function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;
