const user = require('../models/user.js')

const getUserInfo = async (ctx) => {
  const id = ctx.params.id
  const result = await user.getUserById(id)
  console.log(result)
  ctx.body = result
}

module.exports = {
  getUserInfo
}
