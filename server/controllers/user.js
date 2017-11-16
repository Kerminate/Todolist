const user = require('../models/user.js')

const getUserInfo = async () => {
  const id = this.params.id
  const result = await user.getUserById(id)
  this.body = result
}

module.exports = {
  getUserInfo
}
