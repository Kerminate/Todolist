const db = require('../config/db.js')
const userModel = '../schema/user.js'
const ToDolistDb = db.Todolist

const User = ToDolistDb.import(userModel)

const getUserById = async (id) => {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  })
  return userInfo
}

// 新增一个方法，通过用户名查找
const getUserByName = async (name) => {
  const userInfo = await User.findOne({
    where: {
      user_name: name
    }
  })
  return userInfo
}

module.exports = {
  getUserById,
  getUserByName
}
