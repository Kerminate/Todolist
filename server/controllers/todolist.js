const todolist = require('../models/todolist.js')

const getTodolist = async (ctx) => {
  const id = ctx.params.id
  const result = await todolist.getTodolistById(id)
  ctx.body = {
    success: true,
    result
  }
}

const createTodolist = async (ctx) => { // 给某个用户创建一条todolist
  const data = ctx.request.body // post请求，数据是在request.body里的
  const success = await todolist.createTodolist(data)
  ctx.body = {
    success
  }
}

const removeTodolist = async (ctx) => {
  const id = ctx.params.id
  const userId = ctx.params.userId
  const success = await todolist.removeTodolist(id, userId)
  ctx.body = {
    success
  }
}

const updateTodolist = async (ctx) => {
  const id = ctx.params.id
  const userId = ctx.params.userId
  let status = ctx.params.status
  status === '0' ? status = true : status = false

  const success = await todolist.updateTodolist(id, userId, status)
  ctx.body = {
    success
  }
}

module.exports = {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}
