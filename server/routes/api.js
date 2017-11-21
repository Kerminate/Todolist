const koaRouter = require('koa=router')
const todolist = require('../controllers/todolist.js')

const router = koaRouter()
todolist(router)

module.exports = router
