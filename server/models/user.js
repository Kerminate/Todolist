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

module.exports = {
  getUserById
}
