const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') // 第三方密码加密库
const user = require('../models/user.js')

const getUserInfo = async (ctx) => {
  const id = ctx.params.id
  const result = await user.getUserById(id)
  console.log(result)
  ctx.body = result
}

const postUserAuth = async (ctx) => {
  const data = ctx.request.body // post过来的数据存在request.body里
  const userInfo = await user.getUserByName(data.name)

  if (userInfo !== null) { // 如果查无此用户会返回null
    if (!bcrypt.compareSync(data.password, userInfo.password)) { // 同步的密码验证
    // if (data.password !== userInfo.password) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: 'password error!'
      }
    } else { // 如果密码正确
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-todolist' // 指定密钥
      const token = jwt.sign(userToken, secret) // 签发token
      ctx.body = {
        success: true,
        token: token // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在' // 如果用户不存在返回用户不存在
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth
}
