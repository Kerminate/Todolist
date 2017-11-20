const todolist = require('../models/todolist.js')

const getTodolist = async (ctx) => {
  const id = ctx.params.id
  const result = await todolist.getTodolistById(id)
  ctx.body = result
}

const createTodolist = async (ctx) => { // 给某个用户创建一条todolist
  const data = ctx.request.body // post请求，数据是在request.body里的
  const success = await todolist.createTodolist(data)
  ctx.body = {
    success
  }
}

module.exports = {
  getTodolist,
  createTodolist
}
