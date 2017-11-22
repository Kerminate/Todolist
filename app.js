const Koa = require('koa')
const koaRouter = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const koaBodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const path = require('path')
const serve = require('koa-static')
const historyApiFallback = require('koa2-history-api-fallback')
const auth = require('./server/routes/auth.js')
const api = require('./server/routes/api.js')

const app = new Koa()
const router = koaRouter()

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async (ctx, next) => { //  如果JWT验证失败，返回验证失败信息
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', (err, ctx) => {
  console.log('server-error', err)
})

router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/api', jwt({secret: 'vue-todolist'}), api.routes()) // 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致

app.use(router.routes()) // 将路由规则挂载到Koa上
app.use(historyApiFallback()) // 将这两个中间件挂载在api的路由之后
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录

module.exports = app.listen(8889, () => {
  console.log('koa is listening in 8889')
})
