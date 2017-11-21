const Koa = require('koa')
const koaRouter = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const koaBodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
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
// router.use('/api', jwt({secret: 'vue-koa-demo'}), api.routes()) // 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
router.use('/api', api.routes())

app.use(router.routes())

app.listen(8889, () => {
  console.log('koa is listening in 8889')
})

module.exports = app
