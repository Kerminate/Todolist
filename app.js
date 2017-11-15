const Koa = require('koa')
const koaRouter = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const koaBodyparser = require('koa-bodyparser')

const app = new Koa()
const router = koaRouter()

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  let start = new Date()
  next()
  let ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.on('error', (err, ctx) => {
  console.log('server-error', err)
})

app.listen(8889, () => {
  console.log('koa is listening in 8889')
})

module.exports = app
