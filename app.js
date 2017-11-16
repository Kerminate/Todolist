const Koa = require('koa')
const koaRouter = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const koaBodyparser = require('koa-bodyparser')
const auth = require('./server/routes/auth.js')

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

app.on('error', (err, ctx) => {
  console.log('server-error', err)
})

router.use('/auth', auth.routes())

app.use(router.routes())

app.listen(8889, () => {
  console.log('koa is listening in 8889')
})

module.exports = app
